import './Tack.scss';
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type TackType = DefaultButtonPropsType & {
    active?: boolean
    title?: string
    iconSrc: string
}

export const Tack = React.memo(({iconSrc, active = false, title, ...restProps}: TackType) => {
    return <button className={`tack ${active ? 'active' : ''}`} {...restProps}>
        {title && <span className="tack__title">{title}</span>}
        <img className="tack__img" src={iconSrc} alt=""/>
    </button>
})