import { useSelector } from "react-redux";
import { loadTodos, removeTodo, setFilter } from "../store/action/todo.action";
import { useEffect, useRef } from "react";
import { TodoList } from "../cmps/todo-list";
import { TodoAdd } from "../cmps/todo-add";
import { TodoFilter } from "../cmps/todo-filter";
import { Outlet } from "react-router-dom";

export function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)

    const listRef = useRef()

    useEffect(() => {
        loadTodos(filterBy)
    }, [filterBy])

    function setFilterBy(filterBy) {
        setFilter(filterBy)
    }

    function onRemoveTodo(todoId) {
        try {
            removeTodo(todoId)
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddClick = () => {
        setTimeout(
            () => {
                listRef.current?.lastElementChild?.scrollIntoView({ block: 'end', behavior: 'smooth' })
            },
            1000,
        );

    };

    function getUserProgress() {
        if (todos.length) {
            let doneTodos = todos.filter((todo) => todo.isDone === true)
            let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)
            return toPrecentage
        }
    }

    return <section className="todo-index">
        {/* <h1>Todos</h1> */}

        <TodoFilter setFilterBy={setFilterBy} />

        <div className="main-content-index">
            <div className="main-todo-content">
                <TodoAdd handleAddClick={handleAddClick} />
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} listRef={listRef} />
                <div className="progress-bar-bg">
                    <div className="progress-bar" style={{ height: "20px", width: getUserProgress() + "%" }}>
                        <span>{getUserProgress()}%</span>
                    </div>
                </div>
            </div>
            <div className="todo-index-details">
                <Outlet />
            </div>
        </div>

        <p>{todos.length} todos</p>

    </section>
}