const _ = require('lodash');
const Sequelize = require('sequelize');
const DateUtil = require('./../lib/date-util');

module.exports = _.merge({
    type: {
        type: Sequelize.ENUM('Adminitrator', 'User'),
        allowNull: false,
        defaultValue: 'User'
    },
    status: {
        type: Sequelize.ENUM('Enabled', 'Locked', 'Disabled', 'Pending'),
        defaultValue: 'Enabled'
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    displayName: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    avatar: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    phone: {
        type: Sequelize.STRING(15),
        allowNull: true
    },
    passwordDate: {
        type: Sequelize.DATE,
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        }
    },
    loginFails: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    lastLoggedInDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    isAcceptedTerm: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
}, _.cloneDeep(require('./base')));