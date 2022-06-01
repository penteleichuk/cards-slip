import {Dialog} from "../../../../../components/Dialog/Dialog";
import RegistrationImg from "../../../../../assets/images/registration.png";
import {InputText} from "../../../../../components/InputText/InputText";
import {Button} from "../../../../../components/Button/Button";
import {UserDataType} from "../../s3-dal/RegisterApi";
import {ChangeEvent, FC, useState} from "react";
import {RouteNames} from "../../../../../constants/routes";
import {emailValidator, passwordValidator} from "../../../../../validations/validators";
import './register.scss'

type RegisterPropsType = {
    email: string
    pass: string
    confirmPass: string
    setEmail: (email: string) => void
    setPass: (pass: string) => void
    setConfirmPass: (confirmPass: string) => void
    setRegister: (userData: UserDataType) => void
}

enum InputVariant { password = "password", text = "text" }

type InputType = {
    pass: InputVariant,
    confirmPass: InputVariant
}
type formErrorsType = string | null

const Register: FC<RegisterPropsType> = ({
                                             email, pass, confirmPass,
                                             setEmail, setPass, setConfirmPass, setRegister
                                         }): JSX.Element => {

    const [inputTypes, setInputTypes] = useState<InputType>({
        pass: InputVariant.password, confirmPass: InputVariant.password
    })
    const [emailError, setEmailError] = useState<formErrorsType>(null)
    const [passError, setPassError] = useState<formErrorsType>(null)
    const [confirmPassError, setConfirmPassError] = useState<formErrorsType>(null)
    const loginLink = [{name: 'You have an Account ?', link: RouteNames.LOGIN}]

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setEmailError((!emailValidator(e.currentTarget.value)) ? 'invalid' : null)
    }

    const validatePass = (value: string, compareItem: string) => {
        (compareItem !== value) ? setConfirmPassError('invalid') : setConfirmPassError(null)
    }

    const entryPass = (value: string) => {
        setPass(value);
        (!passwordValidator(value)) ? setPassError('7+ characters') : setPassError(null)
        confirmPass !== '' && validatePass(value, confirmPass)
    }
    const entryConfirmPass = (value: string) => {
        setConfirmPass(value)
        validatePass(value, pass)
    }

    const changeShowPass = () => {
        (inputTypes.pass === InputVariant.password)
            ? setInputTypes({...inputTypes, pass: InputVariant.text})
            : setInputTypes({...inputTypes, pass: InputVariant.password})
    }

    const changeShowConfirmPass = () => {
        (inputTypes.confirmPass === InputVariant.password)
            ? setInputTypes({...inputTypes, confirmPass: InputVariant.text})
            : setInputTypes({...inputTypes, confirmPass: InputVariant.password})
    }

    const handleSubmit = () => {
        if (pass === '' || confirmPass === '' || email === '') return
        if (confirmPassError || emailError) return

        setRegister({email, password: pass})
    }

    return <>
            <div className="container">
                <Dialog image={RegistrationImg} title={'It-incubator'} subtitle={'Sign Up'}
                        links={loginLink}>
                    <section>
                        <div className="dialog__inputs">
                            <InputText name="email" type="email" placeholder="Email"
                                       value={email} onChange={validateEmail} error={emailError}/>
                            <div className="item_container">
                                <InputText style={{width: "240px"}} name="password"
                                           type={inputTypes.pass} placeholder="Password"
                                           value={pass} onChangeText={entryPass}
                                           error={passError}/>
                                <div className="eye" onClick={changeShowPass}/>
                                {inputTypes.pass === InputVariant.text && <div className="close_eye"/>}
                            </div>
                            <div className="item_container">
                                <InputText style={{width: "240px"}} name="confirmPassword"
                                           type={inputTypes.confirmPass} placeholder="Confirm password"
                                           value={confirmPass} onChangeText={entryConfirmPass}
                                           error={confirmPassError}/>
                                <div className="eye" onClick={changeShowConfirmPass}/>
                                {inputTypes.confirmPass === InputVariant.text && <div className="close_eye"/>}
                            </div>
                            <div className="dialog__buttons dialog__block">
                                <Button onClick={handleSubmit}>Register</Button>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </div>
    </>
}

export default Register