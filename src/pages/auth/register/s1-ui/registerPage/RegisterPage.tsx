import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppStoreType} from "../../../../app/s2-bll/store";
import RegisterContainer from "../registerContainer/RegisterContainer";
import {useCallback} from "react";
import {Navigate} from "react-router-dom";
import ErrorWindow from "../errorWindow/ErrorWindow";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";
import {AnimationBackground} from "../../../../../components/AnimationBackground/AnimationBackground";
import {ThunkDispatch} from "redux-thunk";

type ErrorMessageType = string | null

export const RegisterPage = () => {

    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const errorMessage = useSelector<AppStoreType, ErrorMessageType>(state => state.app.error)
    const dispatch = useDispatch<ThunkDispatch<AppStoreType, ErrorMessageType, ActionType>>()

    const setErrorMessage = useCallback((errorMessage: ErrorMessageType) => {
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