import React from 'react';
import './Pagination.css';

type PaginatedPageType = {
    totalCards: number,
    countPages: number,
    onPageChanged: (value: number) => void,
    currentPage: number,
}

export const PaginatedPage: React.FC<PaginatedPageType> = ({totalCards, countPages, onPageChanged, currentPage}) => {
    const totalPages = Math.ceil(totalCards / countPages)

    let pages = [];
    if (totalPages > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i)
                if (i == totalPages) break
            }
        } else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if (i == totalPages) break
            }
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    }

    return (
        <span className="pages">
            {pages.map((p, key) => <span key={key} onClick={() => onPageChanged(p)}
                                         className={currentPage === p ? 'currentPage' : 'page'}>{p}</span>)}
        </span>
    )
};