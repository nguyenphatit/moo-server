'use strict';
const BaseService = require('./base.service');
const Task = require('./../models').Task;
const Todo = require('./../models').Todo;
const MemoryCacher = require('./../lib/memory-cacher');

class TaskService extends BaseService {

    getModel() {
        return Task;
    }

    async search(req, res, next) {
        try {
            let entities = await this.getModel().findAll({ where: { isDeleted: 0 } });

            return res.status(200).json({
                code: 'SUCCESS',
                data: entities
            });
        } catch (err) {
            this.handlerError(err, res);
        }

    }

    async getById(req, res, next) {
        let id = req.params.id;

        try {
            let entity = await this.getModel().findOne({
                where: { id, isDeleted: 0 },
                include: [{ model: Todo, require: false }]
            });

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async create(req, res, next) {
        let { taskTitle, status } = req.body;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ taskTitle, status }, null, this.getModel());

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async update(req, res, next) {
        let { taskTitle, status } = req.body;
        let id = req.params.id;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ taskTitle, status }, { id }, this.getModel());

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async delete(req, res, next) {
        let id = req.params.id;

        try {
            let entity = await this.save({ isDeleted: 1 }, { id }, this.getModel());

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }
}

module.exports = TaskService;