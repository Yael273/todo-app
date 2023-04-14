
import { todoService } from '../../services/todo.service.js'
import { REMOVE_TODO, SET_TODOS, ADD_TODO, UPDATE_TODO, UNDO_REMOVE_TODO, SET_IS_LOADING, SET_FILTER} from '../reducer/todo.reducer.js'
import { store } from '../store.js'


export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query()
        .then((todos) => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Had issues loading todos', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

//filter
// export function loadTodos(filterBy) {
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })
//     return todoService.query(filterBy)
//         .then((todos) => {
//             store.dispatch({ type: SET_TODOS, todos })
//         })
//         .catch(err => {
//             console.log('Had issues loading todos', err)
//             throw err
//         })
//         .finally(()=>{
//             store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//         })
// }

// Example for Optimistic mutation:
// export function removeTodo(todoId) {
//     store.dispatch({ type: REMOVE_TODO, todoId })
//     return todoService.remove(todoId)
//         .catch(err => {
//             store.dispatch({ type: UNDO_REMOVE_TODO })
//             console.log('Had issues Removing todo', err)
//             throw err
//         })
// }

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Had issues Removing todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
  }