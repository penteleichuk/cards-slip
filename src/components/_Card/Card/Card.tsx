import React from "react";
import moment from 'moment';
import {cardsDarkIcon, editSvg, removeSvg} from "../../../assets/images/icons";
import {PackButton} from "../../components";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import './../../_Pack/Pack/Pack.scss';
import {ItemToUpdateType} from "../Cards/Cards";

type CardPropsType = {
    id: string
    author_id: string
    answer: string
    question: string
    grade: number
    created: Date
    setItemToRemove: (itemToRemove: string) => void
    setItemToUpdate: (itemToUpdate: ItemToUpdateType) => void
}

export const Card = React.memo(({
                                    id,
                                    author_id,
                                    answer,
                                    question,
                                    grade,
                                    created,
                                    setItemToRemove,
                                    setItemToUpdate
                                }: CardPropsType) => {
    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const percent = grade * 100 / 5;

    return <div className="pack">
        <div className="pack__author">
            <div className="pack__wrap">
                {answer}
            </div>
        </div>
        <div className="pack__navigation">
            <div className="pack__count">
                <div className="rating">
                    <div className="rating__body">
                        <div className="rating__active" style={{width: `${percent}%`}}> </div>
                    </div>
                </div>
            </div>
            <div className="pack__buttons">
                {author_id === user_id && <PackButton iconSrc={editSvg} onClick={() => setItemToUpdate({
                    cardId: id,
                    cardQuestion: question,
                    cardAnswer: answer
                })}/>}
                {author_id === user_id && <PackButton iconSrc={removeSvg} onClick={() => setItemToRemove(id)}/>}
            </div>
        </div>
        <div className="pack__content">
            <span className="pack__date">{moment(created).fromNow()}</span>
            <div className="pack__wrap">
                <div className="pack__description">{question}</div>
            </div>
        </div>
    </div>
})