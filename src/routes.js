import { HomePage } from "./page/home-page"
import { TodoDetails } from "./page/todo-details"
import { TodoIndex } from "./page/todo-index"

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/todo',
        component: <TodoIndex />,
        label: 'Todo',
    },
    {
        path: '/todo/:todoId',
        component: <TodoDetails />,
        // label: 'Todo',
    },

]

export default routes