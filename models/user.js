const user = require('./../migrations/user');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', user);

    return User;
}