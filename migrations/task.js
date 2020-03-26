const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = _.merge({
    taskTitle: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM('Completed', 'Processing'),
        defaultValue: 'Processing'
    }
}, _.cloneDeep(require('./base')));