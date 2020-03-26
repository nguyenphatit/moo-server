const TaskService = require('./../services/task.service');

exports.search = (req, res, next) => {
    return new TaskService().search(req, res, next);
}

exports.getById = (req, res, next) => {
    return new TaskService().getById(req, res, next);
}

exports.create = (req, res, next) => {
    return new TaskService().create(req, res, next);
}

exports.update = (req, res, next) => {
    return new TaskService().update(req, res, next);
}

exports.delete = (req, res, next) => {
    return new TaskService().delete(req, res, next);
}