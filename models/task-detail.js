const taskDetail = require('./../migrations/task-detail');

module.exports = (sequelize, Sequelize) => {
    const TaskDetail = sequelize.define('taskDetail', taskDetail);

    return TaskDetail;
}