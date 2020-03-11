const _ = require('lodash');
const Sequelize = require('sequelize');

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
    username: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
        field: 'user_name'
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'last_name'
    },
    displayName: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'display_name'
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    avatar: {
        type: Sequelize.STRING(200),
        allowNull: true,
        field: 'avatar'
    },
    phone: {
        type: Sequelize.STRING(15),
        allowNull: true
    },
    passwordDate: {
        type: Sequelize.DATE,
        field: 'password_date',
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        }
    },
    loginFails: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'login_fails'
    },
    lastLoggedInDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'last_logged_in_date'
    },
    isAcceptedTerm: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        field: 'is_accepted_term'
    },
}, _.cloneDeep(require('./base')));