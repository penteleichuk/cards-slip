import React from 'react';

type PaginatedPageType = {
    totalCards: number,
    countPages: number,
    onPageChanged: (value: number) => void,
    currentPage: number,
}

export const PaginatedPage = ({totalCards, countPages, onPageChanged, currentPage}: PaginatedPageType) => {
    const totalPages = Math.ceil(totalCards / countPages)

    let pages: number[] = [];
    if (totalPages > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i === totalPages) break
            }
        } else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if (i === totalPages) break
            }
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    }

    return (
        <div className="pagination">
            {pages.length > 1 && <div className="dashboard__indent">
                <div className="pagination__body">
                    {pages.map((p, key) => <span key={key} onClick={() => onPageChanged(p)}
                                                 className={`pagination__item${currentPage === p ? ' active' : ''}`}>
                            {p}</span>)}
                </div>
            </div>}
        </div>
    )
};
