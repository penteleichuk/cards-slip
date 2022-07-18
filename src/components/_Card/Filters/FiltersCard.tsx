import React, {useCallback} from "react";
import {SkeletonFilters} from "../../_Pack/Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {CardsPerPage} from "../../CardsPerPage/CardsPerPage";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {sorting, sortingView} from "../../../helpers/sorting";
import {setCardsPerPage, setCardsSort} from "../../../pages/card/s2-bll/CardActions";
import {fetchGetCards} from "../../../pages/card/s2-bll/CardThunks";
import './Filters.scss';

type FiltersType = {
    pageCount?: number
}

export const FiltersCard = React.memo(({pageCount}: FiltersType) => {
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const sortCards = useSelector<AppStoreType, string | undefined>(state => state.card.sortCards) || ''
    const dispatch = useAppDispatch();

    const cardPerPageHandler = useCallback((value: number) => {
        dispatch(setCardsPerPage({pageCount: value}));
        dispatch(fetchGetCards({}));
    }, []);

    const sortingHandler = useCallback((field: string, sort: string) => {
        const sortCards = sorting(field, sort);
        dispatch(setCardsSort({sortCards}));
        dispatch(fetchGetCards({}));
    }, []);

    return <div className="filters">
        {isFetch === 'loading' ?
            <SkeletonFilters/> :
            <>
                <div className="filters__item">
                    <p className="filters__title">Filters</p>
                    <div className="filters__buttons">
                        <NavButton title="Name" iconSvg={TextSvg}
                                   onClick={() => sortingHandler('name', sortCards)}
                                   active={sortingView('name', sortCards)}/>

                        <NavButton title="Rating" iconSvg={cardsSvg}
                                   onClick={() => sortingHandler('grade', sortCards)}
                                   active={sortingView('grade', sortCards)}/>

                        <NavButton title="Last updated" iconSvg={timeSvg}
                                   onClick={() => sortingHandler('updated', sortCards)}
                                   active={sortingView('updated', sortCards)}/>

                        <NavButton title="Created by" iconSvg={updateSvg}
                                   onClick={() => sortingHandler('created', sortCards)}
                                   active={sortingView('created', sortCards)}/>
                    </div>
                </div>
                <div className="filters__item">
                    <p className="filters__title">Show cards per page</p>
                    <CardsPerPage pageCount={pageCount} callBack={cardPerPageHandler}/>
                </div>
            </>
        }
    </div>
});
