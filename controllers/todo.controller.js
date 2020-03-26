const TodoService = require('../services/todo.service');

exports.search = (req, res, next) => {
    return new TodoService().search(req, res, next);
}

exports.getById = (req, res, next) => {
    return new TodoService().getById(req, res, next);
}

exports.create = (req, res, next) => {
    return new TodoService().create(req, res, next);
}

exports.update = (req, res, next) => {
    return new TodoService().update(req, res, next);
}

exports.delete = (req, res, next) => {
    return new TodoService().delete(req, res, next);
}