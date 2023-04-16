import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/styles/main.scss';
import { AppHeader } from './cmps/app-header';
import routes from "./routes";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TodoDetails } from './page/todo-details';
import { HomePage } from './page/home-page';
import { TodoIndex } from './page/todo-index';

export function RootCmp() {

  return (
    <Provider store={store}>
      <div className="App">
        <AppHeader />
        <main>
          {/* <Routes location={background || location}>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
        </Routes> */}
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<TodoIndex />} path="/todo">
              <Route
                path="/todo/:todoId"
                element={<TodoDetails />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Provider>
  );
}
