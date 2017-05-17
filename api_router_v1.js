var express = require('express');
var myapp_controller = require('./api/v1/myapp');


var router = express.Router();


router.post('/myapp/check-update/:key', myapp_controller.checkUpdate);

module.exports = router;