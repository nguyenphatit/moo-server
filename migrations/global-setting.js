const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = _.merge({
    defaultPageSize: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
        field: 'default_page_size'
    },
    passwordExpirationDays: {
        type: Sequelize.INTEGER,
        defaultValue: 90,
        field: ' password_expiration_days'
    },
    unsuccessfulLoginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 90,
        field: 'unsuccessful_login_attempts'
    }
}, _.cloneDeep(require('./base')));