import { Route, Routes } from 'react-router-dom';
import './assets/styles/main.scss';
import { AppHeader } from './cmps/app-header';
import routes from "./routes";
import { Provider } from 'react-redux';
import { store } from './store/store';

export function RootCmp() {

  return (
    <Provider store={store}>
    <div className="App">
      <AppHeader />
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
        </Routes>
      </main>
    </div>
    </Provider>
  );
}
