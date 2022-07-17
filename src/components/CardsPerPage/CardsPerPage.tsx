import React, {useState} from 'react';
import './CardsPerPage.scss';

type CardsPerPageType = {
    pageCount?: number | undefined
    callBack: (e: number) => void
}

export const CardsPerPage = ({pageCount, callBack}: CardsPerPageType) => {
    const [total, setTotal] = useState<number>(pageCount ? pageCount : 6)

    const changeSelect = (e: React.MouseEvent<HTMLElement>) => {
        const value: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '6';
        setTotal(JSON.parse(value))
        callBack(JSON.parse(value))
    }

    return (
        <div className="pre-page">
            <div onClick={changeSelect} data-t='6' className={`pre-page__item${total === 6 ? ' active' : ''}`}>6</div>
            <div onClick={changeSelect} data-t='9' className={`pre-page__item${total === 9 ? ' active' : ''}`}>9</div>
            <div onClick={changeSelect} data-t='12' className={`pre-page__item${total === 12 ? ' active' : ''}`}>12
            </div>
            <div onClick={changeSelect} data-t='15' className={`pre-page__item${total === 15 ? ' active' : ''}`}>15
            </div>
            <div onClick={changeSelect} data-t='18' className={`pre-page__item${total === 18 ? ' active' : ''}`}>18
            </div>
        </div>
    );
};
