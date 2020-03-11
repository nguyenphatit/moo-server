const task = require('./../migrations/task');

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', task);

    Task.associate = function (models) {
        models.Task.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'userId'
        });

        models.Task.belongsTo(models.TaskDetail, {
            foreignKey: 'task_detail_id',
            as: 'taskDetailId'
        });
    }

    return Task;
}