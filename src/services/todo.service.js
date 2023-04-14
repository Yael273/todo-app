
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

_createTodos()

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter
}
window.cs = todoService

async function query(filterBy = getDefaultFilter()) {
    var todos = await storageService.query(STORAGE_KEY)
    if (filterBy.searchTxt) {
        const regex = new RegExp(filterBy.searchTxt, 'i')
        todos = todos.filter((todo) => regex.test(todo.txt))
    }
    return todos
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

async function remove(todoId) {
    await storageService.remove(STORAGE_KEY, todoId)
}
async function save(todo) {
    var savedTodo
    if (todo._id) {
        savedTodo = await storageService.put(STORAGE_KEY, todo)
    } else {
        savedTodo = await storageService.post(STORAGE_KEY, todo)
    }
    return savedTodo
}

function getEmptyTodo() {
    return {
        txt: '',
        desc: 'add a description...',
        date: Date.now(),
        color: '#ded3d3',
        isDone: false,
        isImportant: false
    }
}

function getDefaultFilter() {
    return { isDone: 'all', searchTxt: '' }
}


function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = [
            {
                _id: utilService.makeId(),
                txt: 'This is a todo',
                desc: 'This is a todo description',
                date: Date.now(),
                color: '#f269a2',
                isDone: true,
                isImportant: true
            },
            {
                _id: utilService.makeId(),
                txt: 'This is another todo',
                desc: 'This is a todo description',
                date: Date.now(),
                color: '#ffc800',
                isDone: false,
                isImportant: false
            },
            {
                _id: utilService.makeId(),
                txt: 'Go to the beach',
                desc: 'add a description...',
                date: Date.now(),
                color: '#ded3d3',
                isDone: false,
                isImportant: true
            },
            {
                _id: utilService.makeId(),
                txt: 'Buy milk',
                desc: 'add a description...',
                date: Date.now(),
                color: '#16d098',
                isDone: true,
                isImportant: true
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, todos)
    }
}
