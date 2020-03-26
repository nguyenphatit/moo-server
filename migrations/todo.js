const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = _.merge({
    todoName: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    desciption: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: true,
    }
}, _.cloneDeep(require('./base')));