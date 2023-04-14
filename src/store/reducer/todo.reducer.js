
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UNDO_REMOVE_TODO = 'UNDO_REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER = 'SET_FILTER'

export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    todos: [],
    lastRemovedTodo: null,
    isLoading: false,
}

export function todoReducer(state = initialState, action) {
    let todos
    let lastRemovedTodo

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TODO:
            lastRemovedTodo = state.todos.find(c => c._id === action.todoId)
            todos = state.todos.filter(c => c._id !== action.todoId)
            return { ...state, todos, lastRemovedTodo }

        case UNDO_REMOVE_TODO:
            ({ lastRemovedTodo } = state)
            todos = [lastRemovedTodo, ...state.todos]
            return { ...state, todos, lastRemovedTodo: null }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

            // Filter
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }


        default:
            return state
    }
}