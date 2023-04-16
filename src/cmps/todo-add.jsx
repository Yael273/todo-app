import { todoService } from "../services/todo.service"
import { saveTodo } from "../store/action/todo.action"
import { useState } from "react"
import { flushSync } from "react-dom"

export function TodoAdd({ handleAddClick }) {

    const [todoToAdd, setTodoToAdd] = useState(todoService.getEmptyTodo())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        setTodoToAdd((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        try {
            // flushSync(() => {
            //     saveTodo(todoToAdd)
            // });
            saveTodo(todoToAdd)
        } catch (err) {
            console.log(err);
        }
        handleAddClick()

    }

    return <section className="todo-add">

        <form onSubmit={onAddTodo}>
            <input type="text"
                name="txt"
                id="txt"
                placeholder="Enter todo"
                value={todoToAdd.txt}
                onChange={handleChange}
            />

            <div>
                <button className="btn">Add</button>
            </div>
        </form>
    </section>
}