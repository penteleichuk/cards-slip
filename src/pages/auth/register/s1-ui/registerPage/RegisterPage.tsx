import s from "./RegisterPage.module.css"
import ErrorWindow from "../errorWindow/ErrorWindow";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/s2-bll/store";
import {setErrorMessageAC} from "../../s2-bll/RegisterActions";
import RegisterContainer from "../registerContainer/RegisterContainer";
import {FC, useCallback} from "react";
import {Navigate} from "react-router-dom";

export const RegisterPage: FC = (): JSX.Element => {

    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.register.errorMessage)
    const dispatch = useDispatch<any>()

    const setErrorMessage = useCallback((errorMessage: string | null) => {
        dispatch(setErrorMessageAC(errorMessage))
    }, [dispatch])

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={s.wrapper}>
            <div>
                <RegisterContainer />
            </div>
            {errorMessage && <ErrorWindow error={errorMessage} setError={setErrorMessage}/>}
        </div>
    )
}