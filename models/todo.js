const todo = require('./../migrations/todo');

module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('todo', todo, { timestamps: false });

    Todo.associate = function (models) {
        models.Todo.belongsTo(models.User, {
            foreignKey: 'userId'
        });

        models.Todo.hasMany(models.Task, {
            foreignKey: 'todoId'
        });
    }

    return Todo;
}