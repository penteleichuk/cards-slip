import React, {useState} from 'react';

type PaginatedPageType = {
    totalCards: number,
    countPages: number,
    onPageChanged: (value: number) => void,
    currentPage: number,
}

export const PaginatedPage = ({totalCards, countPages, onPageChanged, currentPage}: PaginatedPageType) => {
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
        <div className="pagination">
            <div className="dashboard__indent">
                <div className="pagination__body">
                    <button className="pagination__nav" onClick={clickHandlerMin} disabled={startPages <= 1}>⟪⟪⟪
                    </button>
                    {pages.map((p, key) =>
                        <button key={key}
                                className={`pagination__item${currentPage === p ? ' active' : ''}`}
                                onClick={() => onPageChanged(p)}> {p}
                        </button>
                    )}
                    <button className="pagination__nav" onClick={clickHandlerPlus} disabled={endPages > totalPages}>⟫⟫⟫
                    </button>
                </div>
            </div>
        </div>
    );
};
