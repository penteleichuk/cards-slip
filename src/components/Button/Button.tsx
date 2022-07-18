import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import './Button.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    loading?: boolean;
}

export const Button = React.memo((props: ButtonPropsType) => {
    const {color = 'primary', loading, ...restProps} = {...props};

    return <button className={`button ${color} ${loading ? 'loading' : ''}`} {...restProps}/>
});
