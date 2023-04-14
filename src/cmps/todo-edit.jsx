import { useState } from "react"
import { saveTodo } from "../store/action/todo.action"

export function TodoEdit({ todo, colorRef }) {
    const [todoDetails, setTodoDetails] = useState(todo)

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'color') {
            setTodoDetails((prevDetails) => ({ ...prevDetails, [field]: value }))
            colorRef.current.style.backgroundColor = value
        }
    }

    function onEditTodo(ev) {
        ev.preventDefault()
        try {
            saveTodo(todoDetails)
        } catch (err) {
            console.log(err);
        }
    }
    return <section className="todo-edit">
        <div className='user-colors'>
            <input
                onChange={handleChange}
                onBlur={(ev) => onEditTodo(ev)}
                type='color'
                name='color'
                value={todoDetails.color}
            />

        </div>
    </section>
}