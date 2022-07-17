import React, {useEffect, useState} from "react";
import {Filters} from "../Filters/Filters";
import {Packs} from "../Packs/Packs";
import {RouteNames} from "../../../constants/routes";
import {Cards} from "../../_Card/Cards/Cards";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {PackInitStateType} from "../../../pages/pack/s2-bll/PackInitState";
import {CardStateType} from "../../../pages/card/s2-bll/CardInitState";
import {fetchGetPacks} from "../../../pages/pack/s2-bll/PackThunks";

export const PackAll = React.memo(({isCards}: { isCards: string | null }) => {
    const {
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
    } = useSelector<AppStoreType, PackInitStateType>(state => state.pack);

    const pageCountCards = useSelector<AppStoreType, CardStateType>(state => state.card).pageCount;
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useAppDispatch();

    // Card loading
    useEffect(() => {
        dispatch(fetchGetPacks({page, pageCount}));
    }, [dispatch])

    // Number of cards to display
    useEffect(() => {
        setRangeValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    return <>
        <div className="dashboard__sidebar">
            <div className="dashboard__indent">
                <Filters
                    pageCount={isCards ? pageCountCards : pageCount}
                    isCards={isCards}
                    value={rangeValue}
                    setValue={setRangeValue}
                    minCardsCount={minCardsCount}
                    maxCardsCount={maxCardsCount}
                />
            </div>
        </div>
        <div className="dashboard__page">
            <div className="dashboard__indent dashboard__pack">
                {isCards ? <Cards navigatePage={RouteNames.PROFILE}/> : <Packs navigatePage={RouteNames.PROFILE}/>}
            </div>
        </div>
    </>
});
