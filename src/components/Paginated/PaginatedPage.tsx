import React, {useState} from 'react';

type PaginatedPageType = {
    totalCards: number,
    countPages: number,
    onPageChanged: (value: number) => void,
    currentPage: number,
}

export const PaginatedPage: React.FC<PaginatedPageType> = ({totalCards, countPages, onPageChanged, currentPage}) => {
    const [startPages, setSmallPages] = useState(1)
    const [endPages, setEndPages] = useState(20)
    const totalPages = Math.ceil(totalCards / countPages)

    let pages = [];
    for (let i = startPages; i <= endPages; i++) {
        pages.push(i)
    }
    const clickHandlerPlus = () => {
        setSmallPages(startPages + 20)
        setEndPages(endPages + 20)
    }
    const clickHandlerMin = () => {
        setSmallPages(startPages - 20)
        setEndPages(endPages - 20)
    }

    return (
        <span>
            <button onClick={clickHandlerMin} disabled={startPages <= 1}>⟪⟪⟪</button>
            <button>{pages.map((p, key) => <span key={key} onClick={() => onPageChanged(p)} style={currentPage === p ? {fontSize:'medium'}: {}}>
                {p} </span>)}</button>
            <button onClick={clickHandlerPlus} disabled={endPages > totalPages}>⟫⟫⟫</button>
        </span>
    );
};
