import {Route, Routes, Navigate} from "react-router-dom";
import {routes} from "../../../routes";
import {RouteNames} from "../../../constants/routes";
import {Alert} from "../../../components/Alert/Alert";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {initializedApp} from "../s2-bll/thunks";
import {useSelector} from "react-redux";
import {AppStoreType} from "../s2-bll/store";
import {LoadingPage} from "../../../components/_Pages/Loading/LoadingPage";
import './App.scss';

export const App = () => {

    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializedApp());
    }, [dispatch]);

    if(!isInitialized) {
        return <LoadingPage/>
    }

    return (
        <div className="app">
            <Routes>
                {routes.map(route => <Route key={route.path} path={route.path} element={route.component}/>)}
            </Routes>
            <Alert/>
        </div>
    );
}