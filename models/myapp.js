var Sequelize = require('sequelize');

module.exports = function(sequelize){
    var App = sequelize.define(
        'apps',
        {
            'id': {
                'field': 'id',
                'type': Sequelize.STRING(64),
                'primaryKey': true,
                'allowNull': false,
                'unique': true
            },
            'appName':{
                'field': 'app_name',
                'type': Sequelize.STRING(64),
                'allowNull': false
            },
            'platform':{
                'field': 'platform',
                'type': Sequelize.INTEGER(16),
                'allowNull': false
            },
            'versionName':{
                'field': 'version_name',
                'type': Sequelize.STRING(32),
                'allowNull': false
            },
            'versionCode': {
                'field': 'version_code',
                'type': Sequelize.INTEGER(16),
                'allowNull': false
            },
            'downloadURL': {
                'field': 'download_url',
                'type': Sequelize.STRING(64),
                'allowNull': false
            },
            'updateInfo':{
                'field': 'update_info',
                'type': Sequelize.TEXT
            },
            'isOpen': {
                'field': 'is_open',
                'type': Sequelize.INTEGER(1)
            },
            'status': {
                'field': 'status',
                'type': Sequelize.INTEGER(1)
            },
            'key':{
                'field': 'key',
                'type': Sequelize.STRING(128),
                'unique': true
            }
        },
        {
            'freezeTableName': true,
            'tableName': 'apps'
        }
    );

    return App;
}