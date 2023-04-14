import { useNavigate, useParams } from "react-router-dom"
import { todoService } from "../services/todo.service"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai"

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()
    const navigate = useNavigate()

    console.log('todo', todo);

    useEffect(() => {
        loadTodo()
    }, [todoId])

    async function loadTodo() {
        try {
            const todo = await todoService.getById(todoId)
            setTodo(todo)
        } catch (err) {
            console.log('Had issues in todo details', err)
            navigate('/todo')
        }

    }

    if (!todo) return <h1>loading...</h1>
    return <section style={{background: todo?.color}} className="todo-details-page">
        <h2 contentEditable={true} suppressContentEditableWarning={true}>{todo?.txt}</h2>
        <p contentEditable={true} suppressContentEditableWarning={true} className="desc">{todo?.desc}</p>
        <p>{todo?.date && utilService.formatTime(todo.date)}</p>
      { todo?.isImportant && <p className='important'><AiFillExclamationCircle/>Important</p>}
      { todo?.isDone && <p className='done'><AiFillCheckCircle/></p>}
    </section>
}