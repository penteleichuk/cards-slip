import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import './Input.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    iconBefore?: string
    iconAfter?: string
    iconHandler?: () => void
}

export const Input = React.memo((
    {
        name,
        placeholder,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        iconBefore,
        iconAfter,
        iconHandler,
        ...restProps
    }: InputPropsType
) => {
    const [value, setValue] = useState<string>('');

    const iconClickHandler = () => {
        onChangeText && onChangeText('');
        setValue('');
    }

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeText && onChangeText(e.currentTarget.value);
        setValue(e.currentTarget.value);
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter();
    }

    return (
        <span className={`input${error ? ' input__error-show' : ''}`}>
            <input className={`input__field${iconBefore ? ' input__field-indent' : ''}`}
                   placeholder={placeholder}
                   value={value}
                   name={name}
                   id={name}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   {...restProps}
            />

            {iconBefore && <img className={'input__icon-before'} src={iconBefore} alt=""/>}
            {value && iconAfter && <img className={'input__icon-after'} onClick={iconClickHandler} src={iconAfter} alt=""/>}
            {error && <span className={'input__error'}>{error}</span>}
        </span>
    )
});
