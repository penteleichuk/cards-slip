import React, {useState} from "react";
import {SkeletonFilters} from "../Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {Range} from "../../Range/Range";
import {CardsPerPage} from "../../CardsPerPage/CardsPerPage";
import {setCardPerPageAC, setSortParamsAC} from "../../../pages/pack/s2-bll/PackActions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import './Filters.scss';
import {setCardsPerPage} from "../../../pages/card/s2-bll/CardActions";
import {getPacksTC, setCardsSortTC} from "../../../pages/pack/s2-bll/PackThunks";

type FiltersType = {
    pageCount?: number
    isCards: string | null
    user_id?: string | undefined
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
}

type filterCodeType = {
    name: string
    cardsCount: string
    updated: string
    created: string
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
    const isMyCardsPack = useSelector<AppStoreType, boolean | null>(state => state.pack.isMyCardsPack)
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page);
    const activeSortPage = useSelector<AppStoreType, string>(state => state.pack.activeSortPage)
    const activeType = useSelector<AppStoreType, string>(state => state.pack.sortType)
    const activeCode = useSelector<AppStoreType, string>(state => state.pack.sortCode)
    const dispatch = useAppDispatch();

    const [filterCode, setFilterCode] = useState<filterCodeType>({
        name: '0', cardsCount: '0', updated: '0', created: '0'
    })
    let actualSortPage = activeSortPage

    const changeCardPerPageHandler = (value: number) => {
        if (!isCards) {
            dispatch(setCardPerPageAC(value))
        } else {
            dispatch(setCardsPerPage({pageCount: value}));
        }
    }

    const sortPacks = (e: React.MouseEvent<HTMLElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        const code: string = e.currentTarget.dataset.c ? e.currentTarget.dataset.c : '';

        const sortParams = isMyCardsPack
            ? {code, type, user_id}
            : {code, type}

        const getParams = isMyCardsPack
            ? {page: currentPage, pageCount, user_id}
            : {page: currentPage, pageCount}

        if (activeType === type) {
            (code === '0') && setFilterCode({...filterCode, [type]: '1'});
            (code === '1') && setFilterCode({...filterCode, [type]: ''});
            (code === '') && setFilterCode({...filterCode, [type]: '0'});
            (type !== '' && code !== '') && dispatch(setCardsSortTC(sortParams));
            if (code === '') {
                dispatch(setSortParamsAC('', ''))
                dispatch(getPacksTC(getParams))
            }
        } else if(activeType !== type || actualSortPage !== activeSortPage) {
                const filter = {...filterCode} as any
                for (let key in filterCode) {
                    filter[key] = (key !== type) ? '0' : '1'
                }
                filter && setFilterCode(filter);
                (type !== '' && code !== '') && dispatch(setCardsSortTC(sortParams))
        }
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
                {!isCards &&
                    <div className="filters__item">
                        <p className="filters__title">Filters</p>
                        <div className="filters__buttons">
                            <NavButton title="Name" data-t='name' data-c={filterCode.name} sortCode={filterCode.name}
                                       iconSvg={TextSvg} onClick={sortPacks}
                                       active={activeType === 'name' && activeCode !== ''}/>
                            <NavButton title="Count card" data-t='cardsCount' data-c={filterCode.cardsCount}
                                       sortCode={filterCode.cardsCount} iconSvg={cardsSvg}
                                       onClick={sortPacks} active={activeType === 'cardsCount' && activeCode !== ''}/>
                            <NavButton title="Last updated" data-t='updated' data-c={filterCode.updated}
                                       sortCode={filterCode.updated} iconSvg={timeSvg}
                                       onClick={sortPacks} active={activeType === 'updated' && activeCode !== ''}/>
                            <NavButton title="Created by" data-t='created' data-c={filterCode.created}
                                       sortCode={filterCode.created} iconSvg={updateSvg}
                                       onClick={sortPacks} active={activeType === 'created' && activeCode !== ''}/>
                        </div>
                    </div>
                }
                <div className="filters__item">
                    <p className="filters__title">Show cards per page</p>
                    <CardsPerPage pageCount={pageCount} callBack={changeCardPerPageHandler}/>
                </div>
            </>
        }
    </div>
});
