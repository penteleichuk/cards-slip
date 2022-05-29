import {useState} from "react";
import RegistrationForm from "../registerForm/RegistrationForm";
import {useDispatch, useSelector} from "react-redux";
import {UserDataType} from "../../s3-dal/RegisterApi";
import {setRegisterUserTC} from "../../s2-bll/thunks/RegisterThunks";
import {AppStoreType} from "../../../../app/s2-bll/store";
import { Navigate } from "react-router-dom";
import s from "./RegisterPage.module.css"
import {setErrorMessageAC} from "../../s2-bll/RegisterActions";
import ErrorWindow from "../errorWindow/ErrorWindow";

export const RegisterPage = (): JSX.Element => {

    ////display on RegisterPageContainer? to fix
    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')

    const errorMessage = useSelector<AppStoreType, string | null>(state => state.register.errorMessage)
    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const dispatch = useDispatch<any>() //to fix

    const setRegister = (userData: UserDataType) => {
        dispatch(setRegisterUserTC(userData))
    }
    const setErrorMessage = (errorMessage: string | null) => {
        dispatch(setErrorMessageAC(errorMessage))
    } //display on windowErrorContainer? to fix

    if(isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={s.wrapper}>
            <div>
                <RegistrationForm email={email} setEmail={setEmail}
                                  pass={pass} setPass={setPass}
                                  confirmPass={confirmPass} setConfirmPass={setConfirmPass}
                                  setRegister={setRegister}
                />
            </div>
            {errorMessage && <ErrorWindow error={errorMessage} setError={setErrorMessage}/>}
        </div>
    )
}