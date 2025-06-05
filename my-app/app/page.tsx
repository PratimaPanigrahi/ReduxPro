import React from 'react';
import store from './components/store/store';
import Dispatcher from './components/store/Dispatcher' ;
import * as actions from './components/store/actions';

function App() {
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  interface AddTodoAction {
    type: string;
    payload: Todo;
  }

  const dispatcher = Dispatcher;

  const handleAddTodo = (todo: Todo): void => {
    dispatcher.dispatch(actions.addTodo(todo));
  };

  interface RemoveTodoAction {
    type: string;
    payload: number;
  }

  const handleRemoveTodo = (index: number): void => {
    dispatcher.dispatch(actions.removeTodo(index));
  };

  return (
    <div>
      <h1>Todo List App</h1>
      {store.todos && store.todos.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Status: {item.completed ? 'Completed' : 'Pending'}</p> 
        </div>
      ))}
    </div>
  );
}

export default App;