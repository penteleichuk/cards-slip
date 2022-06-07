import './PackSort.scss';
import React from "react";

export const PackSortPage = () => {

    const sortByAll = (e: React.MouseEvent<HTMLInputElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : ''
        //dispatch(setCardsSort(type))
    }

    return <div>Pack Page
        <div className="packs">
            <div data-t="name" onClick={sortByAll}>sort by name</div>
            <div data-t="cardsCount" onClick={sortByAll}>sort by cards count</div>
            <div data-t="created" onClick={sortByAll}>sort by create</div>
        </div>
    </div>
}