// ...existing code...

export const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

// ...existing code...
export const addTodo = (todo) => ({
  type: ActionTypes.ADD_TODO,
  todo,
});

export const removeTodo = (id) => ({
  type: ActionTypes.REMOVE_TODO,
  id,
});