import './Filters.scss';
import React, {useState} from "react";
import {SkeletonFilters} from "../Skeleton/SkeletonFilters/SkeletonFilters";
import {NavButton} from "../../NavButton/NavButton";
import {cardsSvg, TextSvg, timeSvg, updateSvg} from "../../../assets/images/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {RequestStatusType} from "../../../pages/app/s2-bll/AppReducer";
import {Range} from "../../Range/Range";
import {getPacksTC, setCardsSortTC} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {GetPackRequestType} from "../../../pages/pack/s3-dal/PackApi";
import {setSortParamsAC} from "../../../pages/pack/s2-bll/PackActions";

type FiltersType = {
    pageCount: number
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

export const Filters = React.memo(({pageCount, isCards, user_id, value, setValue, minCardsCount, maxCardsCount}: FiltersType) => {
    const [filterCode, setFilterCode] = useState<filterCodeType>({
        name: '0', cardsCount: '0', updated: '0', created: '0'
    })

    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page);
    const activeType = useSelector<AppStoreType, string>(state => state.pack.sortType)
    const activeCode = useSelector<AppStoreType, string>(state => state.pack.sortCode)
    const isFetch = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch();

    const sort = (e: React.MouseEvent<HTMLElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        const code: string = e.currentTarget.dataset.c ? e.currentTarget.dataset.c : '';
        console.log(code)
        if (activeType === type) {
            (code === '0') && setFilterCode({...filterCode, [type]: '1'});
            (code === '1') && setFilterCode({...filterCode, [type]: ''});
            (code === '') && setFilterCode({...filterCode, [type]: '0'});
            (type !== '' && code !== '') && dispatch(setCardsSortTC({code, type}));
            if (code === '') {
                dispatch(setSortParamsAC('', ''))
                dispatch(getPacksTC({page: currentPage, pageCount: pageCount}))
            }
        } else {
            if (activeType !== type) {
                const filter = {...filterCode} as any
                for (let key in filterCode) {
                    filter[key] = (key !== type) ? '0' : '1'
                }
                filter && setFilterCode(filter);
                (type !== '' && code !== '') && dispatch(setCardsSortTC({code, type}))
                dispatch(setSortParamsAC(code, type))
            }
        }
    }

    return <div className="filters">
        {isFetch === 'loading' ?
            <SkeletonFilters/> :
            <>
                {!isCards &&
                    <Range step={1}
                           user_id={user_id}
                           value={value}
                           setValue={setValue}
                           minCardsCount={minCardsCount}
                           maxCardsCount={maxCardsCount}
                           title={"Number of cards"}
                    />}

                <div className="filters__buttons">
                    <NavButton title="Name" data-t='name' data-c={filterCode.name} sortCode={filterCode.name}
                               iconSvg={TextSvg} onClick={sort} active={activeType === 'name' && activeCode !== ''}/>
                    <NavButton title="Count card" data-t='cardsCount' data-c={filterCode.cardsCount}
                               sortCode={filterCode.cardsCount} iconSvg={cardsSvg}
                               onClick={sort} active={activeType === 'cardsCount' && activeCode !== ''}/>
                    <NavButton title="Last updated" data-t='updated' data-c={filterCode.updated}
                               sortCode={filterCode.updated} iconSvg={timeSvg}
                               onClick={sort} active={activeType === 'updated' && activeCode !== ''}/>
                    <NavButton title="Created by" data-t='created' data-c={filterCode.created}
                               sortCode={filterCode.created} iconSvg={updateSvg}
                               onClick={sort} active={activeType === 'created' && activeCode !== ''}/>
                </div>
            </>
        }
    </div>
});