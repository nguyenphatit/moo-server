var express = require('express');
var router = express.Router();
var homeController = require('./../controllers/index');

/* GET home page. */
router.get('/', homeController.home);

module.exports = router;
