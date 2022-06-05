import {Button} from "../../../components/Button/Button";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutTC} from "../../auth/login/s2-bll/thunks/LoginThunks";
import {MeProfileType} from "../s3-dal/ProfileApi";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {settingProfileTC} from "../s2-bll/thunks/ProfileThunks";

export const ProfilePage = (): JSX.Element => {
    const profileMe = useSelector<AppStoreType, MeProfileType>(state => state.profile)
    const dispatch = useAppDispatch();
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    const logoutHandler = () => {
        dispatch(logoutTC());
    }
    const changeNameHandler = (newValue:string) => {
        dispatch(settingProfileTC(newValue))
    }

    if(!isAuth) {
        return <Navigate to={RouteNames.LOGIN} />
    }

    return (
        <section className="content forgot">
            <div className="container">
                <div>Profile Page</div>
                <div>
                <img src={profileMe.avatar} alt={'place for photo'}/>
                </div>
                Name: <EditableSpan value={profileMe.name} onChange={changeNameHandler}/>
                <div>Email: {profileMe.email}</div>
                <Button onClick={logoutHandler} color={'secondary'}>Logout</Button>
            </div>
        </section>
    )
}