import React from "react";
import moment from 'moment';
import {cardsDarkIcon, editSvg, removeSvg, viewSvg} from "../../../assets/images/icons";
import {PackButton} from "../../components";
import './Pack.scss';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {useNavigate} from "react-router-dom";
import {fetchCards} from "../../../pages/card/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

type PackPropsType = {
    author: string
    author_id: string
    id: string
    description: string
    packs: number
    date: Date
}

export const Pack = React.memo(({author, description, packs, date, author_id, id}: PackPropsType) => {
    const dispatch = useAppDispatch();
    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const navigate = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const packId: string = e.currentTarget.dataset.pack || '';
        dispatch(fetchCards({cardsPack_id: packId}));
        return navigate(`/profile?id=${packId}`);
    }

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
                <PackButton data-pack={id} onClick={clickHandler} iconSrc={viewSvg} />
                {author_id === user_id && <PackButton iconSrc={editSvg} />}
                {author_id === user_id && <PackButton iconSrc={removeSvg} />}
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