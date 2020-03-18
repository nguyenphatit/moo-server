'use strict';
const BaseService = require('./base.service');
const Task = require('./../models').Task;
const MemoryCacher = require('./../lib/memory-cacher');

class TaskService extends BaseService {

    getModel() {
        return Task;
    }

    search(req, res, next) {
        return this.getModel().findAll().then(result => {
            return res.status(200).json({
                code: 'SUCCESS',
                data: result
            });
        }).catch(error => {
            return this.handlerError(error, res);
        });
    }
}

module.exports = TaskService;