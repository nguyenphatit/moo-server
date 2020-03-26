const DateUtil = require('./../lib/date-util');
const Sequelize = require('sequelize');

module.exports = {
    createdDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        },
    },
    updatedDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        },
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    }
}