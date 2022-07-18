import React, {useCallback} from "react";
import moment from 'moment';
import {cardsDarkIcon, learnSvg, editSvg, removeSvg, listSvg} from "../../../assets/images/icons";
import {PackButton} from "../../components";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {useNavigate} from "react-router-dom";
import {ItemToUpdateType} from "../Packs/PacksDraw";
import './Pack.scss';

type PackPropsType = {
    navigatePage: string
    author: string
    author_id: string
    id: string
    description: string
    packs: number
    date: Date
    setItemToRemove: (itemToRemove: string) => void
    setItemToUpdate: (itemToUpdate: ItemToUpdateType) => void
}

export const Pack = React.memo((props: PackPropsType) => {
    const {
        navigatePage,
        author,
        description,
        packs,
        date,
        author_id,
        id,
        setItemToRemove,
        setItemToUpdate
    } = {...props};

    const userId = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const navigate = useNavigate();

    const setItemUpdateHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        setItemToUpdate({
            packId: id,
            packName: description
        });
    }, []);

    const setItemRemoveHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        setItemToRemove(id);
    }, []);

    const viewHandler = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        const packId: string = e.currentTarget.dataset.pack || '';
        return navigate(`${navigatePage}${packId}`);
    }, []);

    const readHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        alert('learn');
    }

    return <div className="pack" onClick={readHandler}>
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
                {author_id === userId && <PackButton data-pack={id} onClick={viewHandler} iconSrc={listSvg}/>}
                {author_id === userId && <PackButton iconSrc={editSvg} onClick={setItemUpdateHandler}/>}
                {author_id === userId && <PackButton iconSrc={removeSvg} onClick={setItemRemoveHandler}/>}
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
