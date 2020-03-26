const user = require('./../migrations/user');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', user, { timestamps: false });

    return User;
}