var validator = require('validator');
var _ = require('lodash');
var co = require('co');
var jwt = require('jsonwebtoken');
var Utils = require('../../common/Utils');
var Models = require('../../models');
var config = require('../../config');
var User = Models.User;


/**
 * 登陆
 * @param {*} req 
 * @param {*} res 
 */
var login = function(req, res){
    if (_.isEmpty(req.body) || !_.hasIn(req.body, 'loginName') || !_.hasIn(req.body, 'passWord')) {
        res.status(400).json({
            message: "Bad Request(请求错误)"
        });
        return;
    }

    var option = {
        where: {'loginName': req.body.loginName, 'isAdmin': 1},
        attributes: ['id', 'loginName', 'passWord', 'nickName', 'email', 'salt']
    };
    co(function *(){
        var _user = yield User.findOne(option);
        if (_.isEmpty(_user)) {
            res.status(404).json({message: "用户不存在"});
            return
        }

        if (_user.passWord == Utils.hashPassword(req.body.passWord, _user.salt)) {
            var token = jwt.sign(
                {id: _user.id, loginName: _user.loginName},
                config.jwt_secret,
                {expiresIn: config.jwt_expiresIn}
            );
            res.status(200).json({
                id: _user.id,
                loginName: _user.loginName,
                nickName: _user.nickName,
                email: _user.email,
                token: token
            });
        }else {
            res.status(403).json({message: "登陆失败"});
        }
    }).catch(function(err){
        res.status(500).json({
            err: err,
            message: err.message
        });
    });
};

exports.login = login;


/**
 * 普通注册
 * @param {*} req 
 * @param {*} res 
 */
var register = function(req, res){
    if (_.isEmpty(req.body)) {
        res.status(400).json({message: "Bad Request(请求错误)"});
        return;
    }

    var hasKeys = ['loginName', 'passWord', 'nickName', 'email'];
    var canRegiste = true;
    hasKeys.forEach(function(key) {
        if (!_.hasIn(req.body, key)) canRegiste = false;
    }, this);

    if (! canRegiste) {
        res.status(400).json({message: "Bad Request(请求错误)"});
        return;
    }
    

    var loginName = validator.trim(req.body.loginName);
    var passWord = validator.trim(req.body.passWord);
    var nickName = validator.trim(req.body.nickName);
    var email = validator.trim(req.body.email);

    var countOption = {
        where:{
            $or: [{'loginName': loginName}, {'email': 'email'}]
        }
    };
    co(function *(){
        var count = yield User.count(countOption);
        if (count>0) {
            res.status(401).json({message: "用户名或邮箱已存在"});;
            return;
        }

        var _salt = Utils.getSalt();
        var userInfo = {
            id: Utils.getUUID(),
            loginName: loginName,
            passWord: Utils.hashPassword(passWord, _salt),
            nickName: nickName,
            email: email,
            isAdmin: 0,
            salt: _salt
        };

        var result = yield User.create(userInfo);
        res.status(200).json(result);
    }).catch(function(err){
        res.status(500).json({
            err: err,
            message: err.message
        });
    });
};
exports.register = register;