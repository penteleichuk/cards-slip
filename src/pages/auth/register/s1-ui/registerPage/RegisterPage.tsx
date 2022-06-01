import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/s2-bll/store";
import RegisterContainer from "../registerContainer/RegisterContainer";
import {FC, useCallback} from "react";
import {Navigate} from "react-router-dom";
import ErrorWindow from "../errorWindow/ErrorWindow";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";
import {AnimationBackground} from "../../../../../components/AnimationBackground/AnimationBackground";

type ErrorMessageType = string | null

export const RegisterPage: FC = (): JSX.Element => {

    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const errorMessage = useSelector<AppStoreType, ErrorMessageType>(state => state.app.error)
    const dispatch = useDispatch<any>() //to fix

    const setErrorMessage = useCallback((errorMessage: string | null) => {
        dispatch(setAppErrorAC(errorMessage))
    }, [dispatch])

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <section className="content set-password">
            <AnimationBackground/>
            <RegisterContainer/>
            {errorMessage && <ErrorWindow error={errorMessage} setError={setErrorMessage}/>}
        </section>
    )
}