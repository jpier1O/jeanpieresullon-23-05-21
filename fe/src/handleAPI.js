import axios from "axios";

const API_URL="http://localhost:3000/todo/"
async function createTodo(task) {
  console.log(task);
  const { data: newTodo } = await axios.post(`${API_URL}/create`, {
    task
  });
  return newTodo;
}

async function deleteTodo(id) {
  await axios.delete(`${API_URL}/${id}/delete`);
}

async function updateTodo(id, data) {
  await axios.put(`${API_URL}/${id}/update`,data, { params: {
    id
  }});
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL, { headers: {
    authorization: ' xxxxxxxxxx' ,
    'Content-Type': 'application/json'
 } });
  return todos;
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos };