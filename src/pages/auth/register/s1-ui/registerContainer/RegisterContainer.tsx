import {FC, memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {UserDataType} from "../../s3-dal/RegisterApi";
import {setRegisterUserTC} from "../../s2-bll/thunks/RegisterThunks";
import Register from "../register/Register";
import {ThunkDispatch} from "redux-thunk";
import {ActionType, AppStoreType} from "../../../../app/s2-bll/store";

const RegisterContainer: FC = memo((): JSX.Element => {

    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')

    const dispatch = useDispatch<ThunkDispatch<AppStoreType, UserDataType, ActionType>>()

    const setRegister = useCallback((userData: UserDataType) => {
        dispatch(setRegisterUserTC(userData))
    },[dispatch])

    return (
        <div>
                <Register email={email} pass={pass} confirmPass={confirmPass}
                setEmail={setEmail} setPass={setPass} setConfirmPass={setConfirmPass} setRegister={setRegister}
                />
        </div>
    )
})

export default RegisterContainer