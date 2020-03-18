const TaskService = require('./../services/task.service');

exports.search = (req, res, next) => {
    return new TaskService().search(req, res, next);
}