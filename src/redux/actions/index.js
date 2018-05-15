export const ADD_TODO = 'ADD_TODO';

let nextTodoId = 0
export const addTodo = text => ({
    type: ADD_TODO,
    id: nextTodoId++,
    text
})
