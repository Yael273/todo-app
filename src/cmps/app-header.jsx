import { NavLink } from 'react-router-dom'
import routes from '../routes.js'

export function AppHeader() {

    return <section className="app-header">
        <header>
            <h2>Todo</h2>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>
        </header>
    </section>
}