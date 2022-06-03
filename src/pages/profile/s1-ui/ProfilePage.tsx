import {Button} from "../../../components/Button/Button";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import { Navigate } from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutTC} from "../../auth/login/s2-bll/thunks/LoginThunks";

export const ProfilePage = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    const logoutHandler = () => {
        dispatch(logoutTC());
    }

    if(!isAuth) {
        return <Navigate to={RouteNames.LOGIN} />
    }

    return (
        <section className="content forgot">
            <div className="container">
                <div>Profile Page</div>
                <Button onClick={logoutHandler} color={'secondary'}>Logout</Button>
            </div>
        </section>
    )
}