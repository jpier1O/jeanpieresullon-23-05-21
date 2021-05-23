  
const Todo = require('../models/todo.model');

exports.todo_getall =  function (req, res, next) {
    Todo.find({}, function (err, todo) {
        if (err) return next(err);
        res.send(todo);
    }) 
    
};

exports.todo_create = function (req, res, next) {
    let todo = new Todo(
        {
            task: req.body.task,
            completed: req.body.completed
        }
    );
    todo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Todo Created successfully')
    })
};
exports.todo_details = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) return next(err);
        res.send(todo);
    })
};

exports.todo_update = function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, product) {
            if (err) return next(err);
            res.send('Todo is updated.');
        });
};

exports.todo_delete = function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Todo deleted'+req.params.id+'succesfully')
    })
};