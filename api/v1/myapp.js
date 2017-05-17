var _ = require('lodash');
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



    // App.findAndCountAll().then(function(result){
    //     res.status(200).json({
    //         message: "测试",
    //         result: result,
    //         key: key,
    //         body: body,
    //         userAgent: userAgent
    //     });
    // }).catch(function(result){
    //     res.status(500).json(result);
    // });
    
};

exports.checkUpdate = checkUpdate;