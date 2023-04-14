import { Link } from "react-router-dom"
import { todoService } from "../services/todo.service"
import { saveTodo } from "../store/action/todo.action"
import { useState } from "react"

export function TodoAdd() {

    const [todoToAdd, setTodoToAdd] = useState(todoService.getEmptyTodo())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        // value = type === 'number' ? +value : value
        setTodoToAdd((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        try {
            saveTodo(todoToAdd)
        } catch (err) {
            console.log(err);
        }
    }

    return <section className="todo-add">

        <form onSubmit={onAddTodo}>
            {/* <label htmlFor="name">Name : </label> */}
            <input type="text"
                name="txt"
                id="txt"
                placeholder="Enter todo"
                value={todoToAdd.txt}
                onChange={handleChange}
            />

            <div>
                {/* <button>{todoToAdd._id ? 'Save' : 'Add'}</button> */}
                <button className="btn">Add</button>
            </div>
        </form>
    </section>
}