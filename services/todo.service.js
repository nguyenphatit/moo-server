'use strict';

const _ = require('lodash');
const BaseService = require('./base.service');
const DateUtil = require('./../lib/date-util');
const Todo = require('./../models').Todo;
const Task = require('./../models').Task;

class TodoService extends BaseService {

    getModel() {
        return Todo;
    }

    async search(req, res, next) {
        try {
            let entities = await this.getAll(this.getModel());

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
        let criteria = {
            where: { id },
            include: [{ model: Task, require: false }]
        };

        try {
            let entity = await this.getModelById(this.getModel(), criteria);

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async create(req, res, next) {
        let { todoName, dueDate, desciption, priority } = req.body;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ todoName, dueDate, desciption, priority }, null, this.getModel());

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async update(req, res, next) {
        let { todoName, dueDate, desciption, priority } = req.body;
        let id = req.params.id;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ todoName, dueDate, desciption, priority }, { id }, this.getModel());

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
            let tasks = await Task.findAll({ where: { todoId: id } });

            await tasks.forEach(task => {
                this.save({ isDeleted: 1 }, { id: task.id }, Task);
            });

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

module.exports = TodoService;