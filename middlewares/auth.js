var _ = require('lodash');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Models = require('../models');
var User = Models.User;


exports.adminRequired = function(req, res, next){
    var token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.jwt_secret, function(err, decoded){
            if (err) {
                res.status(403).json({message: err.message});
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else {
        res.status(403).json({
            message: "No Token provided"
        });
    }
    
}