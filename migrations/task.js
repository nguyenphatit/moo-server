const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = _.merge({
    type: {
        type: Sequelize.ENUM('Tasks', 'My Day', 'Important', 'Planned'),
        allowNull: false,
        defaultValue: 'Tasks'
    },
    status: {
        type: Sequelize.ENUM('Completed', 'Out Of Date', 'Processing'),
        defaultValue: 'Processing'
    },
}, _.cloneDeep(require('./base')));