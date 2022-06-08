import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import './Button.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    loading?: boolean;
}

export const Button = React.memo(({color = 'primary', loading, ...restProps}: ButtonPropsType) => {
    return <button className={`button ${color} ${loading ? 'loading' : ''}`} {...restProps}/>
});