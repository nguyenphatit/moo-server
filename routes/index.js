var express = require('express');
var router = express.Router();
var HomeController = require('./../controllers/index');

/* GET home page. */
router.get('/', HomeController.home);

module.exports = router;
