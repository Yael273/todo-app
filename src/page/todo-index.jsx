import { useSelector } from "react-redux";
import { todoService } from "../services/todo.service";
import { loadTodos, removeTodo } from "../store/action/todo.action";
import { useEffect } from "react";
import { TodoList } from "../cmps/todo-list";
import { TodoAdd } from "../cmps/todo-add";

export function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    console.log('todos', todos);

    useEffect(() => {
        loadTodos()
    }, [])

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

        <TodoAdd />

        <div className="main-todo-content">
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} getUserProgress={getUserProgress} />
            <div className="progress-bar-bg">
                <div className="progress-bar" style={{ height: "24px", width: getUserProgress() + "%" }}>
                    <span>{getUserProgress()}%</span>
                </div>
            </div>
        </div>



    </section>
}