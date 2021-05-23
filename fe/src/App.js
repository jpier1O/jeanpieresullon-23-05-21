import React from "react";
import './App.css';
import TodoSection from './components/TodoSection.js';

function App() {

  return (
    
    <div className="App">
      <div className="container">
        <h1 className="text-center mb-4">List To do</h1>
        <TodoSection/>
      </div>
    </div>
  );
}

export default App;
