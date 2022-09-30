import React, { useState, useRef, useEffect } from 'react'
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "react_todos";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <h3>{this.state.date.toLocaleTimeString()}</h3>
    );
  }
}

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const first = 0;
  
  console.log("Found item orange.");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedTodos);
    if (storedTodos) setTodos(storedTodos);
  }, [first]);

  useEffect(() => {
    const todosString = JSON.stringify(todos);
    //console.log(todosString);
    localStorage.setItem(LOCAL_STORAGE_KEY, todosString);
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function addTodo(e) {
     const title = todoNameRef.current.value;
     if (title === "") return;
     setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), title: title, complete: false}]
     });
     todoNameRef.current.value = null;
  }

  return (
    <div>
      <Clock />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo} type="button">Add Todo</button>
      <button onClick={clearTodos} type="button">Clear Completed</button>
      <p>{todos.filter(todo => !todo.complete).length} left to do</p>
    </div>
  );
}

export default App;
