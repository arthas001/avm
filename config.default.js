var config = {
    /************** JWT 配置 **************/
    jwt_secret: "appversionmanager",
    jwt_expiresIn: '1h',

    /************* 数据库配置 ***************/
    db:{
        dialect: 'mysql',
        username: 'root',
        password: '1234567890',
        db_name: 'avm',
        host: 'localhost',
        port: 3306
    }
};

module.exports = config;