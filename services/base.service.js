'use strict';
const MemoryCacher = require('./../lib/memory-cacher');
const _ = require('lodash');

class BaseService {

    getGlobalSetting() {
        return MemoryCacher.retrieve('global-setting');
    }

    handlerError(error, res) {
        res.status(error.status || 500);
        throw error;
    }

    getAll(model, condition) {
        let criteria = condition || {};
        criteria.where = criteria.where || {};
        criteria.where.isDeleted = 0;

        return model.findAll(criteria);
    }

    getModelById(model, condition) {
        let criteria = condition || {};
        criteria.where.isDeleted = 0;

        return model.findOne(criteria);
    }

    save(entity, condition, model) {
        return model.findOne({ where: condition })
            .then(obj => {
                if (obj) {
                    return obj.update(entity);
                }
                return model.create(entity);
            });
    }
}

module.exports = BaseService;