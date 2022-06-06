import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import './InputText.css'
import EyeIconOn from './../../assets/images/icons/eye_off.png'
import EyeIconOff from './../../assets/images/icons/eye_on.png'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
    eye?: boolean
}

export const InputText = React.memo((
    {
        eye,
        name,
        placeholder,
        onChange,
        onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        type,

        ...restProps
    }: InputTextPropsType
) => {
    const [eyeStatus, setEyeStatus] = useState<boolean>(false);

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const eyeHandler = () => {
        setEyeStatus(!eyeStatus);
    }

    const initType = eye && eyeStatus ? 'text' : type;

    return (
        <span className={`form__group field${error ? ' form__error' : ''}`}>
            <input className={`form__field`}
                   placeholder={placeholder}
                   name={name}
                   id={name}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   type={initType}
                   {...restProps} />

            <label htmlFor={name} className="form__label">{placeholder}</label>
            {error && <span className={'form__errors'}>{error}</span>}
            {eye &&
                <span className={'form__eye'}><img onClick={eyeHandler} src={eyeStatus ? EyeIconOff : EyeIconOn} alt=""/></span>
            }
        </span>
    )
});
