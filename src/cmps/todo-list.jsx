import { TodoPreview } from "./todo-preview";

export function TodoList({ todos, onRemoveTodo }) {

    return <section className="todo-list">
        <ul>
            {
                todos.map(todo => <li key={todo._id}>
                    <TodoPreview todo={todo} onRemoveTodo={onRemoveTodo}/>
                </li>)
            }
        </ul>

    </section>
}