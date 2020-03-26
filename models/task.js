const task = require('./../migrations/task');

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('tasks', task, { timestamps: false });

    Task.associate = function (models) {
        models.Task.belongsTo(models.Todo, {
            foreignKey: 'todoId'
        });
    }

    return Task;
}