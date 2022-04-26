import { Route, Routes } from "react-router-dom";
import { routes } from "../../../routes";
import './App.css';

export const App = () => {
  return (
    <div className="app">
      <Routes>
        {routes.map(route => <Route key={route.path} path={route.path} element={route.component} />)}
      </Routes>
    </div>
  );
}