import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import './Button.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    loading?: boolean;
}

export const Button: React.FC<ButtonPropsType> = React.memo(({color = 'primary', loading, ...restProps}) => {

    return <button className={`button ${color} ${loading ? 'loading' : ''}`} {...restProps}/>
});