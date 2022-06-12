import React from "react";
import './Popup.scss';

type PopupPropsType = {
    title?: string
    show: boolean
    modalOnClick?: () => void
    children: React.ReactNode;
}

export const Popup: React.FC<PopupPropsType> = ({show, modalOnClick, title, children}) => {

    return <div onClick={modalOnClick} className={`popup${show ? ' open' : ''}`}>
        <div className="popup__body">
            <div onClick={e => e.stopPropagation()} className="popup__content">
                <div className="popup__title">{title}</div>
                <div className="popup__text">{children}</div>
            </div>
        </div>
    </div>
}