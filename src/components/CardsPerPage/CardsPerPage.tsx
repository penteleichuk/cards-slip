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
        <span>
            <span>Show</span>
            <select multiple={false} value={total} onChange={changeSelect}>
                <option value={'10'}>10</option>
                <option value={'20'}>20</option>
                <option value={'30'}>30</option>
                <option value={'40'}>40</option>
            </select>
            <span>cards per page</span>
        </span>
    );
};