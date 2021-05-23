  
const Todo = require('../models/todo.model');

exports.todo_getall =  function (req, res, next) {
    Todo.find({"active": true }, function (err, todo) {
        if (err) return next(err);
        res.send(todo);
    }) 
    
};

exports.todo_create = function (req, res, next) {
    console.log(req.body);
    let todo = new Todo(
        {
            task: req.body.task,
            completed: req.body.completed ?? 'false',
            active: true,
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

exports.todo_update = function (req, res, next) {
    console.log(req.params.id);
    Todo.findByIdAndUpdate(req.params.id, {$set: req.body},
        function (err, product) {
            if (err) return next(err);
            res.send('Todo is updated.');
        });
};

exports.todo_delete = function (req, res, next) {
    console.log(req.params.id);
    Todo.findByIdAndUpdate(req.params.id, {$set: {active: false}},
        function (err) {
            if (err) return next(err);
            res.send('Todo deleted'+req.params.id+'succesfully')
        });
};