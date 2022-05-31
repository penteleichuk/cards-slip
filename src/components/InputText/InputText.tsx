import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import './InputText.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
}

export const InputText: React.FC<InputTextPropsType> = React.memo((
    {
        name,
        placeholder,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
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

    return (
        <div className={`form__group field${error ? ' form__error' : ''}`}>
            <input className={`form__field`} placeholder={placeholder} name={name} id={name}
                   onChange={onChangeCallback} onKeyPress={onKeyPressCallback} {...restProps} />
            <label htmlFor={name} className="form__label">{placeholder}</label>
            {error && <span className={'form__errors'}>{error}</span>}
        </div>
    )
});
