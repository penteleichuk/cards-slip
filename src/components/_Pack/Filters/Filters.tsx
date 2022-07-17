import React, {useCallback} from "react";
import {SkeletonFilters} from "../Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {Range} from "../../Range/Range";
import {CardsPerPage} from "../../CardsPerPage/CardsPerPage";
import {setPacksPerPage, setPacksSort} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setCardsPerPage} from "../../../pages/card/s2-bll/CardActions";
import {sorting, sortingView} from "../../../helpers/sorting";
import './Filters.scss';

type FiltersType = {
    pageCount?: number
    isCards: string | null
    user_id?: string | undefined
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
}

export const Filters = React.memo(({
                                       pageCount,
                                       isCards,
                                       user_id,
                                       value,
                                       setValue,
                                       minCardsCount,
                                       maxCardsCount
                                   }: FiltersType) => {
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status);
    const sortPacks = useSelector<AppStoreType, string | undefined>(state => state.pack.sortPacks) || ''
    const dispatch = useAppDispatch();

    const cardPerPageHandler = useCallback((value: number) => {
        if (!isCards) {
            dispatch(setPacksPerPage({totalCards: value}))
        } else {
            dispatch(setCardsPerPage({pageCount: value}));
        }
    }, []);

    const sortingHandler = useCallback((field: string, sort: string) => {
        const sortPacks = sorting(field, sort);
        dispatch(setPacksSort({sortPacks}));
    }, []);

    return <div className="filters">
        {isFetch === 'loading' ?
            <SkeletonFilters/> :
            <>
                {!isCards &&
                    <div className="filters__item">
                        <p className="filters__title" style={{marginBottom: "30px"}}>Number of cards</p>
                        <Range step={1}
                               user_id={user_id}
                               value={value}
                               setValue={setValue}
                               minCardsCount={minCardsCount}
                               maxCardsCount={maxCardsCount}
                               title={" "}
                        />
                    </div>
                }
                {!isCards &&
                    <div className="filters__item">
                        <p className="filters__title">Filters</p>
                        <div className="filters__buttons">
                            <NavButton title="Name" iconSvg={TextSvg}
                                       onClick={() => sortingHandler('name', sortPacks)}
                                       active={sortingView('name', sortPacks)}/>

                            <NavButton title="Count card" iconSvg={cardsSvg}
                                       onClick={() => sortingHandler('cardsCount', sortPacks)}
                                       active={sortingView('cardsCount', sortPacks)}/>

                            <NavButton title="Last updated" iconSvg={timeSvg}
                                       onClick={() => sortingHandler('updated', sortPacks)}
                                       active={sortingView('updated', sortPacks)}/>

                            <NavButton title="Created by" iconSvg={updateSvg}
                                       onClick={() => sortingHandler('created', sortPacks)}
                                       active={sortingView('created', sortPacks)}/>
                        </div>
                    </div>
                }
                <div className="filters__item">
                    <p className="filters__title">Show cards per page</p>
                    <CardsPerPage pageCount={pageCount} callBack={cardPerPageHandler}/>
                </div>
            </>
        }
    </div>
});
