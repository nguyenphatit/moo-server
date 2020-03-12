const globalSetting = require('./../migrations/global-setting');

module.exports = (sequelize, Sequelize) => {
    const GlobalSetting = sequelize.define('globalSetting', globalSetting);

    return GlobalSetting;
}