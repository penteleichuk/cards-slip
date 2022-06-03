import {Dialog, DialogLinkType} from "../../../../../components/Dialog/Dialog";
import RegistrationImg from "../../../../../assets/images/registration.png";
import {InputText} from "../../../../../components/InputText/InputText";
import {Button} from "../../../../../components/Button/Button";
import {UserDataType} from "../../s3-dal/RegisterApi";
import React, {ChangeEvent, useState} from "react";
import {RouteNames} from "../../../../../constants/routes";
import {emailValidator, passwordValidator} from "../../../../../validations/validators";
import {RegisterStatusType} from "../../s2-bll/RegisterInitState";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/s2-bll/store";
import {Navigate} from "react-router-dom";


type RegisterPropsType = {
    email: string
    pass: string
    confirmPass: string
    setEmail: (email: string) => void
    setPass: (pass: string) => void
    setConfirmPass: (confirmPass: string) => void
    setRegister: (userData: UserDataType) => void
    registerStatus: RegisterStatusType
}

enum variantError {
    invalid = 'invalid',
    empty = 'empty field',
    charError = '7+ characters'
}

export type formErrorsType = string | null

const Register = React.memo(({
                                 email, pass, confirmPass, setEmail,
                                 setPass, setConfirmPass, setRegister,
                                 registerStatus
                             }: RegisterPropsType) => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);

    const [emailError, setEmailError] = useState<formErrorsType>(null)
    const [passError, setPassError] = useState<formErrorsType>(null)
    const [confirmPassError, setConfirmPassError] = useState<formErrorsType>(null)
    const loginLink: DialogLinkType[] = [{name: 'You have an Account ?', link: RouteNames.LOGIN}];

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setEmailError((!emailValidator(e.currentTarget.value)) ? variantError.invalid : null)
    }

    const validatePass = (value: string, compareItem: string) => {
        (compareItem !== value) ? setConfirmPassError(variantError.invalid) : setConfirmPassError(null)
    }

    const entryPass = (value: string) => {
        setPass(value);
        (!passwordValidator(value)) ? setPassError(variantError.charError) : setPassError(null)
        confirmPass !== '' && validatePass(value, confirmPass)
    }

    const entryConfirmPass = (value: string) => {
        setConfirmPass(value)
        validatePass(value, pass)
    }

    const handleSubmit = () => {
        if (pass === '' || confirmPass === '' || email === '') {
            setEmailError(variantError.empty)
            setPassError(variantError.empty)
            setConfirmPassError(variantError.empty)
            return
        }
        if (confirmPassError || emailError) return

        setRegister({email, password: pass})
    }

    if(isAuth) {
        return <Navigate to={RouteNames.PROFILE} />
    }

    return (
        <div className="container">
            <Dialog image={RegistrationImg} title={'It-incubator'} subtitle={'Sign Up'} links={loginLink}>
                <section>
                    <div className="dialog__inputs">
                        <InputText className="item"
                                   name="email"
                                   type="email"
                                   placeholder="Email"
                                   value={email}
                                   onChange={validateEmail}
                                   error={emailError}
                        />
                        <InputText name="password"
                                   type={'password'} placeholder="Password"
                                   value={pass} onChangeText={entryPass}
                                   error={passError}
                                   eye={true}
                        />
                        <InputText name="confirmPassword"
                                   type={'password'} placeholder="Confirm password"
                                   value={confirmPass} onChangeText={entryConfirmPass}
                                   error={confirmPassError}
                                   eye={true}
                        />
                        <div className="dialog__buttons dialog__block">
                            <Button onClick={handleSubmit}
                                    loading={registerStatus === 'process'}
                                    disabled={registerStatus === 'process'}>Register</Button>
                        </div>
                    </div>
                </section>
            </Dialog>
        </div>
    )
})

export default Register