import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserDataType} from "../../s3-dal/RegisterApi";
import {setRegisterUserTC} from "../../s2-bll/thunks/RegisterThunks";
import Register from "../register/Register";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppStoreType} from "../../../../app/s2-bll/store";
import {RegisterStatusType} from "../../s2-bll/RegisterInitState";

const RegisterContainer = React.memo(() => {

    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')

    const registerStatus = useSelector<AppStoreType, RegisterStatusType>(state => state.register.registerStatus)
    const dispatch = useDispatch<ThunkDispatch<AppStoreType, UserDataType, ActionType>>()

    const setRegister = useCallback((userData: UserDataType) => {
        dispatch(setRegisterUserTC(userData))
    }, [dispatch])

    return <Register email={email} pass={pass} confirmPass={confirmPass}
                     setEmail={setEmail} setPass={setPass} setConfirmPass={setConfirmPass}
                     registerStatus={registerStatus} setRegister={setRegister}
    />
})

export default RegisterContainer