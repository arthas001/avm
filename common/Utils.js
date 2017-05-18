var uuid_V4 = require('uuid/v4');
var uuid_V1 = require('uuid/v1');
var _ = require('lodash');
var MD5 = require('md5');

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