import { NavLink } from 'react-router-dom'
import routes from '../routes.js'

export function AppHeader() {

    return <section className="app-header">
        <header>
            <div className="logo">
                <h2>Todos</h2>
            </div>
            <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}
            </nav>
        </header>
    </section>
}