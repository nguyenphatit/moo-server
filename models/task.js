const task = require('./../migrations/task');

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', task, { timestamps: false });

    Task.associate = function (models) {
        models.Task.belongsTo(models.Todo, {
            foreignKey: 'todoId'
        });
    }

    return Task;
}