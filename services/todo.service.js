'use strict';

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
            let entities = await this.getModel().findAll({
                includes: [
                    {
                        model: Task,
                        as: 'tasks',
                    }
                ],
                where: { isDeleted: 0 }
            });

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
            let entity = await this.getModel().findOne({ where: { id, isDeleted: 0 } })

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async create(req, res, next) {
        let { taskName, dueDate, desciption, priority } = req.body;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ taskName, dueDate, desciption, priority }, null, this.getModel());

            return res.status(200).json({
                code: 'SUCCESS',
                data: entity
            });
        } catch (err) {
            this.handlerError(err, res);
        }
    }

    async update(req, res, next) {
        let { taskName, dueDate, desciption, priority } = req.body;
        let id = req.params.id;

        try {
            dueDate = DateUtil.formatDate(dueDate, 'MM/DD/YYYY hh:mm:mm A', true);
            let entity = await this.save({ taskName, dueDate, desciption, priority }, { id }, this.getModel());

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

module.exports = TodoService;