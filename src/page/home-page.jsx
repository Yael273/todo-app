import { useSelector } from "react-redux"
import { TodoList } from "../cmps/todo-list";
import { TodoPreview } from "../cmps/todo-preview";
import { utilService } from "../services/util.service";
import { loadTodos } from "../store/action/todo.action";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const importantTodos = todos.filter(todos => todos.isImportant)
    const doneTodos = todos.filter(todos => todos.isDone)

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        loadTodos()
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    function listenToScroll() {
        let heightToHideFrom = 200;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible &&      // to limit setting state only the first time
                setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    return <section className="home-page">

        <div className="hero">
            <h1>Todos</h1>
            <p>Keep your life on track, one task at a time.</p>
            {isVisible && <div className="scroll-down"></div>}
        </div>

        <h2>Important todos</h2>
        {!importantTodos.length && <p>no todos...</p>}
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

        <h2>Done todos</h2>
        {!doneTodos.length && <p>no todos...</p>}
        <ul className="important-list">
            {
                doneTodos.map(todo => <li key={todo._id}>
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