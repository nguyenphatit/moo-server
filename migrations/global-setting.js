const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = _.merge({
    defaultPageSize: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
    },
    passwordExpirationDays: {
        type: Sequelize.INTEGER,
        defaultValue: 90,
    },
    unsuccessfulLoginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 90,
    }
}, _.cloneDeep(require('./base')));