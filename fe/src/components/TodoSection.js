import React, { useState, useEffect } from "react";
import './Todo.css';
import handleAPI from '../handleAPI.js'
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormTodo = ({ addTodo }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (value === '') alert('Please insert task for to do');
    else {
      addTodo(value);
      setValue("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add New Task</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Insert here.." />
    </Form.Group>
    <br/>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

const TodoSection = () => {
  const [todos, setTodos] = useState([]);

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

  const addTodo = (text) => {
    aggregateTodo(text);
  };

  const TodoItem = ({ todo, index}) => {
    return (
      <div
        className="todo"     
      >
        <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.task}</span>
        <div>
          <Button variant="outline-success" onClick={() => updateTodo(todo)}>{todo.completed ? '⎌': '✓'  }</Button>{' '}
          <Button variant="outline-danger" onClick={() => deleteTodo(todo._id)}>🗑</Button>
        </div>
      </div>
    );
  }

  return (
  <>
    <FormTodo addTodo={addTodo} />
      {todos.length > 0 ? <div>
        {todos.map((todo, index) => (
          <Card>
            <Card.Body>
              <TodoItem
                key={index}
                index={index}
                todo={todo}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      : <h4> No Tasks for Todo :( </h4>}
  </>
  );
};

export default TodoSection;