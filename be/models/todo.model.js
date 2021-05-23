const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let TodoSchema = new Schema({
    task: {type: String, required: true, unique: true},
    completed: {type: Boolean, default: false},
});

//Export the model
module.exports = mongoose.model('Todo', TodoSchema);