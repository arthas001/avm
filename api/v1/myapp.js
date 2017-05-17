var _ = require('lodash');
var co = require('co');
var Models = require('../../models');
var App = Models.App;

/**
 * 检查更新
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
var checkUpdate = function(req, res, next){
    if (_.isEmpty(req.params) || _.isEmpty(req.body) || !_.hasIn(req.params, 'key')) {
        res.status(400).json({
            message: "Bad Request(请求错误)"
        });

        return;
    }

    var key = req.params.key;
    var body = req.body;
    var userAgent = req.headers["user-agent"];

    App.count({
        where: {'key': key, 'status': 1, 'platform': body.platform}
    }).then(function(count){
        if (count<=0) {
            res.status(404).json({
                message: "未找到 App"
            });
        }else {
            App.findOne({
                where: {
                    'key': key,
                    'versionCode': {$gt: body.versionCode},
                    'platform': body.platform,
                    'status': 1
                }
            }).then(function(result){
                if (!result) {
                    res.status(204).json();
                }else {
                    res.status(200).json(_.pick(result, ['appName', 'versionName', 'versionCode', 'downloadURL', 'updateInfo']));
                }
            }).catch(function(err){
                res.status(500).json({
                    err: err,
                    message: err.message
                });
            });
        }
    }).catch(function(err){
        res.status(500).json({
            err: err,
            message: err.message
        });
    });
};

exports.checkUpdate = checkUpdate;


/**
 * 获取符合条件的应用列表
 * @param {*} req 
 * @param {*} res 
 */
var applist = function(req, res){
    var option = {
        where: {
            'status': 1
        },
        attributes: ['id', 'appName', 'platform', 'versionName', 'versionCode', 'downloadURL', 'updateInfo', 'isOpen', 'key', 'created_at', 'updated_at']
    };
    var page = 0;
    // option.sortby = 'created_at';
    // option.order = 'created_at desc';

    if (!_.isEmpty(req.query)) {
        // 分页
        if (_.hasIn(req.query, 'page') && _.hasIn(req.query, 'per_page')) {
            page = _.toInteger(req.query.page);
            var per_page = _.toInteger(req.query.per_page);
            option.offset = page;
            option.limit = per_page;
        }

        //返回指定记录的数量
        if (_.hasIn(req.query, 'limit')) {
            var limit = _.toInteger(req.query.limit);
            option.limit = limit;
        }

        if (_.hasIn(req.query, 'sortby') && _.hasIn(req.query, 'order')) {
            var sortby = req.query.sortby;
            var order = req.query.order;
            option.order = sortby + " " + order;
        }
    }


    co(function *(){
        var result = yield App.findAndCountAll(option);
        res.status(200).json(result);
    }).catch(function(err){
        res.status(500).json({
            err: err,
            message: err.message
        });
    });
    
}

exports.applist = applist;