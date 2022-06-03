import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {IdleForgotDialog} from "../../../../components/_Auth/IdleForgotDialog/IdleForgotDialog";
import {SuccessForgotDialog} from "../../../../components/_Auth/SuccessForgotDialog/SuccessForgotDialog";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../app/s2-bll/store";
import {ForgotStateType} from "../s2-bll/ForgotInitState";
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../../constants/routes";

export const ForgotPage = (): JSX.Element => {
    const state = useSelector<AppStoreType, ForgotStateType>(state => state.forgot);
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    if(isAuth) {
        return <Navigate to={RouteNames.PROFILE} />
    }

    return <>
        <section className="content forgot">
            <AnimationBackground/>
            <div className="container">
                {state.status === 'success' ? <SuccessForgotDialog sendEmail={state.sendEmail}/> : <IdleForgotDialog/>}
            </div>
        </section>
    </>
}