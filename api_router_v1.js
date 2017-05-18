var express = require('express');
var myapp_controller = require('./api/v1/myapp');


var router = express.Router();


/**
 * 检查更新
 */
router.post('/myapp/check-update/:key', myapp_controller.checkUpdate);

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