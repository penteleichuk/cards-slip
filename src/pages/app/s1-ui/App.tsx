import {Route, Routes} from "react-router-dom";
import {Header} from "../../../components/_Pages/Header/Header";
import {routes} from "../../../routes";
import './App.scss';
import {Notification} from "../../../components/_Pages/Notification/Notification";

export const App = () => {
    return (
        <div className="app">
            <Header/>
            <Routes>
                {routes.map(route => <Route key={route.path} path={route.path} element={route.component}/>)}
            </Routes>
            <Notification/>
        </div>
    );
}