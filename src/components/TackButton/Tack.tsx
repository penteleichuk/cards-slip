import './Tack.scss';
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type TackType = DefaultButtonPropsType & {
    active?: boolean
    title?: string
    iconSrc: string
    iconSvg?: boolean
}

export const Tack = React.memo(({iconSrc, active = false, title, iconSvg = false, ...restProps}: TackType) => {
    return <button className={`tack ${active ? 'active' : ''}`} {...restProps}>
        {title && <span className="tack__title">{title}</span>}
        <img className={`${iconSvg? 'tack__svg' : 'tack__img'}`} src={iconSrc} alt=""/>
    </button>
})