import React from "react";
import moment from 'moment';
import {cardsDarkIcon, editSvg, removeSvg, viewSvg} from "../../../assets/images/icons";
import {PackButton} from "../../components";
import './Pack.scss';

type PackPropsType = {
    author: string
    description: string
    packs: number
    date: Date
}

export const Pack = React.memo(({author, description, packs, date}: PackPropsType) => {
    return <div className="pack">
        <div className="pack__author">
            <div className="pack__wrap">
                {author}
            </div>
        </div>
        <div className="pack__navigation">
            <div className="pack__count">
                <img className="pack__icon" src={cardsDarkIcon} alt=""/>{packs}
            </div>
            <div className="pack__buttons">
                <PackButton iconSrc={viewSvg} />
                <PackButton iconSrc={editSvg} />
                <PackButton iconSrc={removeSvg} />
            </div>
        </div>
        <div className="pack__content">
            <span className="pack__date">{moment(date).fromNow()}</span>
            <div className="pack__wrap">
                <div className="pack__description">{description}</div>
            </div>
        </div>
    </div>
})