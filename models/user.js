var Sequelize = require('sequelize');

module.exports = function(sequelize){
    var User = sequelize.define(
        'users',
        {
            'id': {
                'field': 'id',
                'type': Sequelize.STRING(64),
                'primaryKey': true,
                'allowNull': false,
                'unique': true
            },
            'loginName':{
                'field': 'loginname',
                'type': Sequelize.STRING(64),
                'allowNull': false,
                'unique': true
            },
            'passWord':{
                'field': 'password',
                'type': Sequelize.STRING(128),
                'allowNull': false
            },
            'nickName':{
                'field': 'nickname',
                'type': Sequelize.STRING(64),
                'allowNull': false,
                'unique': true
            },
            'email':{
                'field': 'email',
                'type': Sequelize.STRING(64),
                'allowNull': false,
                'unique': true
            },
            'isAdmin':{
                'field': 'isadmin',
                'type': Sequelize.INTEGER,
                'allowNull': false
            },
            'salt':{
                'field': 'salt',
                'type': Sequelize.STRING(64),
                'allowNull': false
            }
        },
        {
            'freezeTableName': true,
            'tableName': 'users'
        }
    );

    return User;
};