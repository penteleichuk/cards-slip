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
import {setSortParamsAC} from "../../../pages/pack/s2-bll/PackActions";
import {getPacksTC} from "../../../pages/pack/s2-bll/PackThunks";

export const PackProfile = React.memo(({isCards}: { isCards: string | null }) => {
    const { minCardsCount, maxCardsCount, page, pageCount, } = useSelector<AppStoreType, PackInitStateType>(state => state.pack);

    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const pageCountCards = useSelector<AppStoreType, CardStateType>(state => state.card).pageCount;
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useAppDispatch();

    // Card loading
    useEffect(() => {
        dispatch(setSortParamsAC({sortCode: '0', sortType: ''}));
        dispatch(getPacksTC({user_id, page, pageCount}));
    }, [dispatch, page, pageCount])

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
                    user_id={user_id}
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
