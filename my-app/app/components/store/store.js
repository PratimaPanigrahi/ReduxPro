// store.js
import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import { ActionTypes } from './actions';
const CHANGE_EVENT = 'change';

let todos = [];

class TodoStore extends EventEmitter {
  constructor() {
    super();

    // Register the Dispatcher callback
    Dispatcher.register(this.handleActions.bind(this));
  }

  getAllTodos() {
    return todos;
  }

  addTodo(todo) {
    todos.push(todo);
    this.emitChange();
  }

  removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    this.emitChange();
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  handleActions(action) {
    switch (action.type) {
      case ActionTypes.ADD_TODO:
        this.addTodo(action.todo);
        break;
      case ActionTypes.REMOVE_TODO:
        this.removeTodo(action.id);
        break;
      default:
        // Do nothing
    }
  }
}

const todoStore = new TodoStore();
const allTodos = todoStore.getAllTodos();
export default { todoStore, todos: allTodos };
