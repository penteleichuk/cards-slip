import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import './Checkbox.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<CheckboxPropsType> = React.memo((props) => {
    const {type,onChange, onChangeChecked,className, spanClassName,children, ...restProps} = {...props};

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    return (
        <label className="toggle">
            <input type="checkbox" className="toggle__input"
                   onChange={onChangeCallback} {...restProps} />
            <span className="toggle-track">
                <span className="toggle-indicator"></span>
            </span>
            {children}
        </label>
    )
});
