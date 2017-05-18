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
 * 获取应用列表
 */
router.get('/myapp', myapp_controller.applist);


module.exports = router;