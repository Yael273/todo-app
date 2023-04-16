import { useSelector } from "react-redux";
import { todoService } from "../services/todo.service";
import { loadTodos, removeTodo, setFilter } from "../store/action/todo.action";
import { useEffect } from "react";
import { TodoList } from "../cmps/todo-list";
import { TodoAdd } from "../cmps/todo-add";
import { TodoFilter } from "../cmps/todo-filter";
import { TodoDetails } from "./todo-details";
import { Outlet, useLocation } from "react-router-dom";

export function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)

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

        {/* <div className="main-todo-content">
                <TodoAdd />
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} getUserProgress={getUserProgress} />
                <div className="progress-bar-bg">
                    <div className="progress-bar" style={{ height: "20px", width: getUserProgress() + "%" }}>
                        <span>{getUserProgress()}%</span>
                    </div>
                </div>
            </div>
            <Outlet /> */}
        <div className="main-content-index">
            <div className="main-todo-content">
                <TodoAdd />
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} getUserProgress={getUserProgress} />
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