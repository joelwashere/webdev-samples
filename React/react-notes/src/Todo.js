import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id);
    }
    
    return (
        <div>
            <input id={todo.id} type={"checkbox"} checked={todo.complete}
                onChange={handleTodoClick}/>
            <label htmlFor={todo.id}>{todo.title}</label>
        </div>
    )
}