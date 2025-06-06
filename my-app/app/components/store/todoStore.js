import { ActionTypes } from './actions';
import Dispatcher from './Dispatcher';

let _todos = [];
let _listeners = [];

const todoStore = {
  getAllTodos() {
    return _todos;
  },
  addChangeListener(listener) {
    _listeners.push(listener);
  },
  removeChangeListener(listener) {
    _listeners = _listeners.filter(l => l !== listener);
  },
  emitChange() {
    _listeners.forEach(listener => listener());
  }
};

Dispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      _todos = [..._todos, action.todo];
      todoStore.emitChange();
      break;
    case ActionTypes.REMOVE_TODO:
      _todos = _todos.filter(todo => todo.id !== action.id);
      todoStore.emitChange();
      break;
    default:
      break;
  }
});

export { todoStore };