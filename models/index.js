var Sequelize = require('sequelize');
var config = require('../config');

var sequelize = new Sequelize(config.db.db_name, config.db.username, config.db.password, {
    'dialect': config.db.dialect,
    'host': config.db.host,
    'port': config.db.port,
    'define': {
        'underscored': true
    }
});

exports.sequelize = sequelize;

// 应用
var App = require('./myapp')(sequelize);
exports.App = App;


// 用户
var User = require('./user')(sequelize);
exports.User = User;