"use client";
// Example: TodoList.jsx
import React, { useEffect, useState } from 'react';
import { todoStore } from './todoStore';
import { addTodo, removeTodo } from './actions';
import Dispatcher from './Dispatcher';

// ...rest of your code...

export default function TodoList() {
  const [todos, setTodos] = useState(todoStore.getAllTodos());
  const [input, setInput] = useState('');

  useEffect(() => {
    const onChange = () => setTodos(todoStore.getAllTodos());
    todoStore.addChangeListener(onChange);
    return () => todoStore.removeChangeListener(onChange);
  }, []);

  const handleAdd = () => {
    if (input.trim()) {
      Dispatcher.dispatch(addTodo({ id: Date.now(), text: input }));
      setInput('');
    }
  };

  const handleRemove = (id) => {
    Dispatcher.dispatch(removeTodo(id));
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
