var Sequelize = require('sequelize');

var sequelize = new Sequelize('avm', 'root', '1234567890', {
    'dialect': 'mysql',
    'host': 'localhost',
    'port': 3306,
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