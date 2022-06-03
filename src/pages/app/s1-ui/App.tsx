import {Route, Routes, useNavigate} from "react-router-dom";
import {Header} from "../../../components/_Pages/Header/Header";
import {routes} from "../../../routes";
import './App.scss';
import {Notification} from "../../../components/_Pages/Notification/Notification";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppStoreType} from "../s2-bll/store";
import {useEffect} from "react";
import {initializeAppTC} from "../s2-bll/thunks";
import {ThunkDispatch} from "redux-thunk";
import {MeProfileType} from "../../auth/login/s3-dal/LoginApi";
import {RouteNames} from "../../../constants/routes";

export const App = () => {
    const initializedStatus = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn)
    const dispatch: ThunkDispatch<AppStoreType, MeProfileType, ActionType> = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeAppTC())
        if (!initializedStatus) {
            debugger
            navigate(RouteNames.LOGIN)
        }
    }, [initializedStatus])

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