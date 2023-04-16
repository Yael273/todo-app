import { TodoPreview } from "./todo-preview";

export function TodoList({ todos, onRemoveTodo, listRef }) {
  
    return <section className="todo-list">
        <ul ref={listRef}>
            {
                todos.map(todo => <li key={todo._id}>
                    <TodoPreview todo={todo} onRemoveTodo={onRemoveTodo}/>
                </li>)
            }
        </ul>

    </section>
}