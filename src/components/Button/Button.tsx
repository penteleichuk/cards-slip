import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import './Button.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
}

export const Button: React.FC<ButtonPropsType> = React.memo((
    {
        color = 'primary',
        className,
        ...restProps
    }) => {

    return (
        <button className={`button ${color}`} {...restProps}/>
    )
});
