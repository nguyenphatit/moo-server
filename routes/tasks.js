const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const taskController = require('../controllers/task.controller');

router.get('/', taskController.search);

module.exports = router;
