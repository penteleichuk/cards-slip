import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/s2-bll/store";
import RegisterContainer from "../registerContainer/RegisterContainer";
import {Navigate} from "react-router-dom";
import {AnimationBackground} from "../../../../../components/AnimationBackground/AnimationBackground";

type ErrorMessageType = string | null

export const RegisterPage = () => {

    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const errorMessage = useSelector<AppStoreType, ErrorMessageType>(state => state.app.error)

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <section className="content set-password">
            <AnimationBackground/>
            <RegisterContainer/>
        </section>
    )
}