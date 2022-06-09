import './NavButton.scss';
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type NavButtonType = DefaultButtonPropsType & {
    active?: boolean
    title?: string
    iconSvg: string
}

export const NavButton = React.memo(({iconSvg, active = false, title, ...restProps}: NavButtonType) => {
    return <button className={`nav-button ${active ? 'active' : ''}`} {...restProps}>
        <div className="nav-button__body">
            <img className="nav-button__img" src={iconSvg} alt=""/>
            {title && <span className="nav-button__title">{title}</span>}
        </div>
    </button>
})