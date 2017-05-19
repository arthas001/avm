var uuid_V4 = require('uuid/v4');
var uuid_V1 = require('uuid/v1');
var _ = require('lodash');
var MD5 = require('md5');
var crypto = require('crypto');

/**
 * 获取 UUID
 */
var getUUID = function(){
    var uuid = uuid_V4();
    uuid = MD5(uuid);
    return uuid;
};

exports.getUUID = getUUID;


/**
 * 获取key
 * @param {*} str 
 */
var masterKey = function(str){
    var key = MD5(str);
    return key;
}

exports.masterKey = masterKey;


/**
 * 撒盐加密
 * @param {*} password 
 * @param {*} salt 
 */
var hashPassword = function(password, salt){
    return crypto.pbkdf2Sync(password, salt||"1234567890", 100, 64, 'sha512').toString('base64');
};

exports.hashPassword = hashPassword;


/**
 * 获取 salt
 */
var getSalt = function(){
    return new Buffer(crypto.randomBytes(16)).toString('base64');
};

exports.getSalt = getSalt;