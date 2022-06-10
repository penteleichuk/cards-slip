import React from "react";
import {SkeletonFilters} from "../Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {Range} from "../../Range/Range";
import {CardsPerPage} from "../../CardsPerPage/CardsPerPage";
import {setCardPerPageAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import './Filters.scss';
import {setCardsPerPage} from "../../../pages/card/s2-bll/CardActions";

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
    const dispatch = useAppDispatch();

    const changeCardPerPageHandler = (value: number) => {
        dispatch(setCardsPerPage({cardsTotalCount: value}));
        // if(isCards) {
        //     dispatch(setCardPerPageAC(value))
        // } else {
        //     dispatch(setCardsPerPage({cardsTotalCount: value}));
        // }
    }
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
                <div className="filters__item">
                    <p className="filters__title">Filters</p>
                    <div className="filters__buttons">
                        <NavButton title="Name" iconSvg={TextSvg}/>
                        <NavButton title="Count card" iconSvg={cardsSvg}/>
                        <NavButton title="Last updated" iconSvg={timeSvg}/>
                        <NavButton title="Created by" iconSvg={updateSvg}/>
                    </div>
                </div>
                <div className="filters__item">
                    <p className="filters__title">Show cards per page</p>
                    <CardsPerPage pageCount={pageCount} callBack={changeCardPerPageHandler}/>
                </div>
            </>
        }
    </div>
});