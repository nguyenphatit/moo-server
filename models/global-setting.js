const globalSetting = require('./../migrations/global-setting');

module.exports = (sequelize, Sequelize) => {
    const GlobalSetting = sequelize.define('global_setting', globalSetting, { timestamps: false });

    return GlobalSetting;
}