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
import {setCardsPerPage, setSortCardsParams} from "../../../pages/card/s2-bll/CardActions";
import {getPacksTC, setPacksSortTC} from "../../../pages/pack/s2-bll/PackThunks";
import {getCards, setCardsSortTC} from "../../../pages/card/s2-bll/CardThunks";
import {useSearchParams} from "react-router-dom";

type FiltersType = {
    pageCount?: number
    isCards: string | null
    user_id?: string | undefined
    value: number[]
    setValue: (value: number[]) => void
    minCardsCount: number
    maxCardsCount: number
}

type FilterPackCodeType = {
    name: string
    cardsCount: string
    updated: string
    created: string
}
type FilterCardCodeType = {
    question: string
    grade: string
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
    const activeCardType = useSelector<AppStoreType, string>(state => state.card.sortType)
    const activeCardCode = useSelector<AppStoreType, string>(state => state.card.sortCode)
    const [urlParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const cardsPackId = urlParams.get('id');

    const [filterPackCode, setFilterPackCode] = useState<FilterPackCodeType>({
        name: '0', cardsCount: '0', updated: '0', created: '0'
    })
    const [filterCardCode, setFilterCardCode] = useState<FilterCardCodeType>({
        question: '0', grade: '0', created: '0'
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
            ? {sortCode: code, sortType: type, user_id}
            : {sortCode: code, sortType: type}

        const getParams = isMyCardsPack
            ? {page: currentPage, pageCount, user_id}
            : {page: currentPage, pageCount}

        if (activeType === type) {
            (code === '0') && setFilterPackCode({...filterPackCode, [type]: '1'});
            (code === '1') && setFilterPackCode({...filterPackCode, [type]: ''});
            (code === '') && setFilterPackCode({...filterPackCode, [type]: '0'});
            (type !== '' && code !== '') && dispatch(setPacksSortTC(sortParams));
            if (code === '') {
                dispatch(setSortParamsAC({sortCode: '', sortType: ''}))
                dispatch(getPacksTC(getParams))
            }
        } else if (activeType !== type || actualSortPage !== activeSortPage) {
            const filter = {...filterPackCode} as any
            for (let key in filterPackCode) {
                filter[key] = (key !== type) ? '0' : '1'
            }
            filter && setFilterPackCode(filter);
            (type !== '' && code !== '') && dispatch(setPacksSortTC(sortParams))
        }
    }

    const sortCards = (e: React.MouseEvent<HTMLElement>) => {

        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        const code: string = e.currentTarget.dataset.c ? e.currentTarget.dataset.c : '';

        const cardsPack_id = urlParams.get('id');

        const sortParams = {sortCode: code, sortType: type, cardsPack_id}

        const getParams = {page: currentPage, pageCount, cardsPack_id}

        if (activeCardType === type) {
            (code === '0') && setFilterCardCode({...filterCardCode, [type]: '1'});
            (code === '1') && setFilterCardCode({...filterCardCode, [type]: ''});
            (code === '') && setFilterCardCode({...filterCardCode, [type]: '0'});
            (type !== '' && code !== '') && dispatch(setCardsSortTC(sortParams));
            if (code === '') {
                dispatch(setSortCardsParams({sortType: '', sortCode: ''}))
                dispatch(getCards(getParams))
            }
        } else if (activeCardType !== type || cardsPack_id !== cardsPackId) {
            const filter = {...filterCardCode} as any
            for (let key in filterCardCode) {
                filter[key] = (key !== type) ? '0' : '1'
            }
            filter && setFilterCardCode(filter);
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
                {
                    isCards
                        ? <div className="filters__item">
                            <p className="filters__title">Filters</p>
                            <div className="filters__buttons">
                                <NavButton title="Question" data-t='question' data-c={filterCardCode.question}
                                           iconSvg={TextSvg} sortCode={filterCardCode.question} onClick={sortCards}
                                           active={activeCardType === 'question' && activeCardCode !== ''}
                                />
                                <NavButton title="Grade" data-t='grade' data-c={filterCardCode.grade}
                                           iconSvg={cardsSvg} sortCode={filterCardCode.grade} onClick={sortCards}
                                           active={activeCardType === 'grade' && activeCardCode !== ''}
                                />
                                <NavButton title="Created by" data-t='created' data-c={filterCardCode.created}
                                           iconSvg={updateSvg} sortCode={filterCardCode.created} onClick={sortCards}
                                           active={activeCardType === 'created' && activeCardCode !== ''}
                                />
                            </div>
                        </div>
                        : <div className="filters__item">
                            <p className="filters__title">Filters</p>
                            <div className="filters__buttons">
                                <NavButton title="Name" data-t='name' data-c={filterPackCode.name}
                                           sortCode={filterPackCode.name}
                                           iconSvg={TextSvg} onClick={sortPacks}
                                           active={activeType === 'name' && activeCode !== ''}
                                />
                                <NavButton title="Count card" data-t='cardsCount' data-c={filterPackCode.cardsCount}
                                           sortCode={filterPackCode.cardsCount} iconSvg={cardsSvg}
                                           onClick={sortPacks} active={activeType === 'cardsCount' && activeCode !== ''}
                                />
                                <NavButton title="Last updated" data-t='updated' data-c={filterPackCode.updated}
                                           sortCode={filterPackCode.updated} iconSvg={timeSvg}
                                           onClick={sortPacks} active={activeType === 'updated' && activeCode !== ''}
                                />
                                <NavButton title="Created by" data-t='created' data-c={filterPackCode.created}
                                           sortCode={filterPackCode.created} iconSvg={updateSvg}
                                           onClick={sortPacks} active={activeType === 'created' && activeCode !== ''}
                                />
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
