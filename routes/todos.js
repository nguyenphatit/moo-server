const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.search);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;
