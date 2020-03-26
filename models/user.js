const user = require('./../migrations/user');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', user, { timestamps: false });

    return User;
}