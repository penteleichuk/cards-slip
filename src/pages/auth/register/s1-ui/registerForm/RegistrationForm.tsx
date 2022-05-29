import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import {InputText} from "../../../../../components/InputText/InputText";
import {Button} from "../../../../../components/Button/Button";
import {UserDataType} from "../../s3-dal/RegisterApi";
import s from "./RegistrationForm.module.css"

type RegistrationPropsType = {
    email: string
    pass: string
    confirmPass: string
    setEmail: (email: string) => void
    setPass: (pass: string) => void
    setConfirmPass: (confirmPass: string) => void
    setRegister: (userData: UserDataType) => void
}

enum InputVariantType {
    password = "password",
    text = "text"
}

const RegistrationForm: FC<RegistrationPropsType> = ({
                                                         email, pass, confirmPass,
                                                         setEmail, setPass, setConfirmPass, setRegister
                                                     }): JSX.Element => {

    const [inputType, setInputType] = useState<InputVariantType>(InputVariantType.password)
    const [passError, setPassError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)

    //func изменения видимости пароля
    // const passwordVisibility = () => {
    //     if (inputType === InputVariantType.text) {
    //         setInputType(InputVariantType.password)
    //         return
    //     }
    //     setInputType(InputVariantType.text)
    // }


    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.currentTarget.value)) {
            setEmailError('invalid')
        } else {
            setEmailError(null)
        }
    }
    const validatePass = (value: string, compareItem: string) => {
        if (compareItem !== value) {
            setPassError('invalid')
        } else {
            setPassError(null)
        }
    }

    const entryPass = (value: string) => {
        setPass(value)
    }
    const entryConfirmPass = (value: string) => {
        setConfirmPass(value)
        validatePass(value, pass)
    }


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (pass === '' || confirmPass === '' || email === '') return
        if (passError || emailError) return

        setRegister({email, password: pass})
    }

    return (
        <div>
                <div className={s.paper}>
                    <div>
                        <InputText type="email" placeholder="email" value={email} name="email"
                                   onChange={validateEmail} error={emailError}/>
                        <InputText type={inputType} name="pass" placeholder="password" value={pass}
                                   onChangeText={entryPass} />
                        <InputText type={inputType} name="confirmPass" placeholder="confirm" value={confirmPass}
                                   onChangeText={entryConfirmPass}
                                   error={passError}/>
                    </div>
                    <Button onClick={handleSubmit}>Send</Button>
                </div>
        </div>
    )
}

export default RegistrationForm