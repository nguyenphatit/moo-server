'use strict';
const MemoryCacher = require('./../lib/memory-cacher');

class BaseService {

    getGlobalSetting() {
        return MemoryCacher.retrieve('global-setting');
    }

    handlerError(error, res) {
        res.status(error.status || 500);
        throw error;
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