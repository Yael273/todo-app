import { useNavigate, useParams } from "react-router-dom"
import { todoService } from "../services/todo.service"
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai"
import { saveTodo } from "../store/action/todo.action"
import loader from '../assets/img/loader.svg'

export function TodoDetails() {

    const contentRef = useRef(null)
    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()
    const navigate = useNavigate()

    console.log('todo', todo);

    useEffect(() => {
        loadTodo()
    }, [todoId, todo])

    async function loadTodo() {
        try {
            const todo = await todoService.getById(todoId)
            setTodo(todo)
        } catch (err) {
            console.log('Had issues in todo details', err)
            navigate('/todo')
        }

    }

    function changeContent(ev) {
        todo.desc = contentRef.current.innerText

        if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
        if (ev.key === 'Enter' || ev.type === 'blur') {
            ev.preventDefault()
            onSaveTodo()
            contentRef.current.contentEditable = false
        }
        contentRef.current.contentEditable = true
    }

    function onSaveTodo() {
        try {
            saveTodo(todo)
            console.log('saved');
        } catch (err) {
            console.log(err);
        }
    }

    if (!todo) return <div className="loader">
        <img src={loader} alt="loader" />
    </div>

    return <section style={{ background: todo?.color }} className="todo-details-page">
        <h2>{todo?.txt}</h2>
        <p
            ref={contentRef}
            onKeyDown={(ev) => changeContent(ev)}
            onBlur={(ev) => changeContent(ev)}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="desc">{todo?.desc}</p>
        <p>{todo?.date && utilService.formatTime(todo.date)}</p>
        {todo?.isImportant && <p className='important'><AiFillExclamationCircle />Important</p>}
        {todo?.isDone && <p className='done'><AiFillCheckCircle /></p>}
    </section>
}