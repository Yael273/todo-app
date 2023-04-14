import { useSelector } from "react-redux"
import { TodoList } from "../cmps/todo-list";
import { TodoPreview } from "../cmps/todo-preview";
import { utilService } from "../services/util.service";
import { loadTodos } from "../store/action/todo.action";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function HomePage() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const importantTodos = todos.filter(todos => todos.isImportant)

    useEffect(() => {
        loadTodos()
    }, [])

    return <section className="home-page">
        <h2>Important todos</h2>

        <ul className="important-list">
            {
                importantTodos.map(todo => <li key={todo._id}>
                    <Link to={`/todo/${todo._id}`}>
                        <section className="important-list-preview" style={{ background: todo.color }}>
                            <h2>{todo.txt}</h2>
                            <p>{utilService.formatTime(todo.date)}</p>
                        </section>
                    </Link>
                </li>)
            }
        </ul>

    </section>
}