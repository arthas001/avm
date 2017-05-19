var express = require('express');
var auth_middleware = require('./middlewares/auth');
var myapp_controller = require('./api/v1/myapp');
var service_controller = require('./api/v1/service');



var router = express.Router();

/**
 * 登陆
 */
router.post('/admin', service_controller.login);


/**
 * 普通注册
 */
router.post('/service/register', service_controller.register);


/**
 * 检查更新
 */
router.post('/myapp/check-update/:key', myapp_controller.checkUpdate);

/**
 * 权限验证中间件
 */
router.use(auth_middleware.adminRequired);
/**
 * 新建 App
 */
router.post('/myapp', myapp_controller.createApp);


/**
 * 根据 ID  删除 app (软删除)
 */
router.delete('/myapp/:ID', myapp_controller.deleteAppByID);


/**
 * 更改 app
 */
router.put('/myapp/:ID', myapp_controller.updateAppByID);

/**
 * 获取应用列表
 */
router.get('/myapp', myapp_controller.applist);


module.exports = router;