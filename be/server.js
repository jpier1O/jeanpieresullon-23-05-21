const cors = require("cors");
const CONNECTION_URL = "mongodb+srv://userzero:12345@cluster0.puhl4.mongodb.net/tododb?retryWrites=true&w=majority"
const DATABASE_NAME = "tododb";
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(
  mongoDB,{
  keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.Promise = Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require('express')
const todo = require('./routes/todo.route.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/todo', todo);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});