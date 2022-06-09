import React, {ChangeEvent, useState} from 'react';

type CardsPerPageType = {
    pageCount?: number | undefined
    callBack: (e:number)=>void
}

export const CardsPerPage = ({pageCount,callBack}: CardsPerPageType) => {
    const [total, setTotal] = useState<number>(pageCount || 0)

    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setTotal(JSON.parse(e.currentTarget.value))
        callBack(JSON.parse(e.currentTarget.value))
    }

    return (
        <div className="selector">
            <span>Show </span>
            <select multiple={false} value={total} onChange={changeSelect}>
                <option value={'6'}>6</option>
                <option value={'9'}>9</option>
                <option value={'12'}>12</option>
                <option value={'15'}>15</option>
            </select>
            <span> cards per page</span>
        </div>
    );
};