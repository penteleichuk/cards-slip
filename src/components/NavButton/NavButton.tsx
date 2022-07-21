import './NavButton.scss';
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import downArrow from '../../assets/images/icons/down-arrow.svg'
import upArrow from '../../assets/images/icons/up-arrow.svg'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type NavButtonType = DefaultButtonPropsType & {
    active: string | undefined
    title?: string
    iconSvg: string
    sortType?: string
}

export const NavButton = React.memo(({iconSvg, active, title, ...restProps}: NavButtonType) => {

    return <button className={`nav-button ${active ? 'active' : ''}`} {...restProps}>
        <div className="nav-button__body">
            <img className="nav-button__img" src={iconSvg} alt=""/>
            {title && <span className="nav-button__title">{title}</span>}
        </div>

        {active === '0' ? <img className="nav-button__img-status" src={downArrow} alt=""/> : null}
        {active === '1' ? <img className="nav-button__img-status" src={upArrow} alt=""/> : null}
    </button>
})
