import React from "react";
import {Link} from "react-router-dom";
import './Dialog.scss';

export type DialogLinkType = {
    link: string
    name: string
}

export type DialogPropsType = {
    children?: React.ReactNode
    links?: Array<DialogLinkType>
    image: string
    title: string
    subtitle?: string
}

export const Dialog = React.memo((props: DialogPropsType) => {
    const {children, links, image, title, subtitle} = props;

    return <>
        <div className="dialog">
            <div className="dialog__container">
                <div className="dialog__present">
                    <img src={image} alt=""/>
                </div>
                <div className="dialog__form">
                    <div className="dialog__wrapper">
                        <div className="dialog__header">
                            <h3 className="dialog__title">{title}</h3>
                            {subtitle && <p className="dialog__subtitle">{subtitle}</p>}
                        </div>
                        <div className={`dialog__content ${links?.length ? 'dialog__content-links' : ''}`}>
                            {links?.length && <DialogLinks links={links}/>}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
});

const DialogLinks: React.FC<{ links: Array<DialogLinkType> }> = React.memo(({links}) => {
    return <>
        <div className={'dialog__navbar'}>
            <div className="dialog__list">
                {links.map(el => <Link key={el.link} to={el.link}>{el.name}</Link>)}
            </div>
        </div>
    </>
});