import React, { useState, useEffect } from "react";
import './App.css';
import handleAPI from './handleAPI.js'
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const fetchTodoAndSetTodos = async () => {
    const todos = await handleAPI.getAllTodos();
    setTodos(todos);
  };

  const aggregateTodo = async (text) => {
    await handleAPI.createTodo(text)
    fetchTodoAndSetTodos();
  };

  const deleteTodo = async (id) => {
    await handleAPI.deleteTodo(id);
    fetchTodoAndSetTodos();
  }

  const updateTodo = async (task) => {
    let { _id, ...data} = {...task};
    data = {...data, completed: !data.completed};
    await handleAPI.updateTodo(_id, data);
    fetchTodoAndSetTodos();
  }

  useEffect(() => {
    fetchTodoAndSetTodos();
  }, []);

  // const createTodo = async e => {
  //   e.preventDefault();
  //   if (!todo) {
  //     alert("please enter something");
  //     return;
  //   }
  //   if (todos.some(({ task }) => task === todo)) {
  //     alert(`Task: ${todo} already exists`);
  //     return;
  //   }
  //   const newTodo = await handleAPI.createTodo(todo);
  //   console.log(newTodo);
  //   setTodos([...todos, newTodo]);
  // };

  // const deleteTodo = async (e, id) => {
  //   try {
  //     e.stopPropagation();
  //     await handleAPI.deleteTodo(id);
  //     setTodos(todos.filter(({ _id: i }) => id !== i));
  //   } catch (err) {}
  // };

  // const updateTodo = async (e, id) => {
  //   e.stopPropagation();
  //   const payload = {completed: !todos.find(todo => todo._id === id).completed}
  //   const updatedTodo  = await handleAPI.updateTodo(id, payload);
  //   setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));  
  // };

  const addTodo = (text) => {
    aggregateTodo(text);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const Todo = ({ todo, index, markTodo, removeTodo }) => {
    return (
      <div
        className="todo"     
      >
        <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.task}</span>
        <div>
          <Button variant="outline-success" onClick={() => updateTodo(todo)}>✓</Button>{' '}
          <Button variant="outline-danger" onClick={() => deleteTodo(todo._id)}>✕</Button>
        </div>
      </div>
    );
  }

  return (
    
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
