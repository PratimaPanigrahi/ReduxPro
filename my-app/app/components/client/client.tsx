"use client";

//import React from "react";
import React, { useEffect, useState } from 'react';
import { Dispatcher } from 'flux';
const dispatcher = new Dispatcher();
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
interface AddTodoAction {
    type: typeof ADD_TODO;
    todo: string;
}

const addTodoAction =
    (todo: string): AddTodoAction => ({ type: ADD_TODO, todo });
interface RemoveTodoAction {
    type: typeof REMOVE_TODO;
    index: number;
}

const removeTodoAction =
    (index: number): RemoveTodoAction => ({ type: REMOVE_TODO, index });
let todos: string[] = [];
interface Listener {
    (todos: string[]): void;
}

const listeners: Listener[] = [];
interface NotifyListeners {
    (): void;
}

interface RegisterListener {
    (listener: Listener): number;
}
const registerListener: RegisterListener =
    (listener) => listeners.push(listener);

const notifyListeners: NotifyListeners =
    () => listeners.forEach(
        (listener: Listener) => listener(todos));
dispatcher.register((payload: unknown) => {
    const action = payload as AddTodoAction | RemoveTodoAction;
    switch (action.type) {
        case ADD_TODO:
            todos.push(action.todo);
            break;
        case REMOVE_TODO:
            todos = todos.filter(
                (_, i) => i !== action.index);
            break;
        default:
            return;
    }
    notifyListeners();
});
const App = () => {
    const [todoList, setTodoList] = useState(todos);
    const [input, setInput] = useState('');

    useEffect(() => {
        registerListener(setTodoList);
    }, []);
    const addFn = () => {
        if (input.trim()) {
            dispatcher.dispatch(addTodoAction(input));
            setInput('');
        }
    };
    interface RemoveFn {
        (index: number): void;
    }

    const removeFn: RemoveFn = (index) => {
        dispatcher.dispatch(removeTodoAction(index));
    };
    return (
        <div style={{
            textAlign: 'center',
            marginTop: '50px'
        }}>
            <h1 style={{ color: 'green' }}>
                GeeksforGeeks
            </h1>
            <h3>Example 2</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    padding: '10px',
                    marginRight: '10px'
                }} />
            <button
                onClick={addFn}
                style={{
                    padding: '10px',
                    cursor: 'pointer'
                }}>
                Add Todo
            </button>
            <ul style={{
                listStyleType: 'none',
                padding: 0, marginTop: '20px'
            }}>
                {todoList.map((todo, index) => (
                    <li
                        key={index}
                        style={{
                            padding: '10px',
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '300px',
                            margin: '0 auto',
                        }}>
                        {todo}
                        <button
                            onClick={() => removeFn(index)}
                            style={{
                                cursor: 'pointer',
                                padding: '5px 10px'
                            }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default App;
// import { useSelector, useDispatch } from "react-redux";
// import { selectCount, increment, decrement, incrementByAmount } from "@/lib/features/counter/counterSlice";

// export default function Counter() {
//   const count = useSelector(selectCount);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h2>Counter Example</h2>
//       <div>
//         <button onClick={() => dispatch(decrement())}>-</button>
//         <span style={{ margin: "0 1rem" }}>{count}</span>
//         <button onClick={() => dispatch(increment())}>+</button>
//       </div>
//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={() => dispatch(incrementByAmount(5))}>
//           Increment by 5
//         </button>
//       </div>
//     </div>
    
//   );
  
// }