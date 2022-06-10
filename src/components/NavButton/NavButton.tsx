import './NavButton.scss';
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import downArrow from '../../assets/images/icons/down-arrow.svg'
import upArrow from '../../assets/images/icons/up-arrow.svg'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type NavButtonType = DefaultButtonPropsType & {
    active?: boolean
    title?: string
    iconSvg: string
    sortType?: string
    sortCode?: string
}

export const NavButton = React.memo(({iconSvg, active = false, title, sortCode, sortType, ...restProps}: NavButtonType) => {
    return <button className={`nav-button ${active ? 'active' : ''}`} {...restProps}>
        <div className="nav-button__body">
            <img className="nav-button__img" src={iconSvg} alt=""/>
            {title && <span className="nav-button__title">{title}</span>}
        </div>
        {sortCode && (sortCode === '0' || sortCode === '') ? <img className="nav-button__img-status" src={downArrow} alt=""/> : null}
        {sortCode && (sortCode === '1') ? <img className="nav-button__img-status" src={upArrow} alt=""/> : null}
    </button>
})