import React, {useEffect, useState} from "react";
import {Filters} from "../Filters/Filters";
import {Packs} from "../Packs/Packs";
import {RouteNames} from "../../../constants/routes";
import {Cards} from "../../_Card/Cards/Cards";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchGetPacks} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setPacksUserId} from "../../../pages/pack/s2-bll/PackActions";

export const PackAll = React.memo(({isCards}: { isCards: string | null }) => {
    const {minCardsCount, maxCardsCount, page, pageCount, sortPacks, } = useAppSelector(state => state.pack);
    const [numCards, setNumCards] = useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPacksUserId({user_id: undefined}));
    }, []);

    // Card loading
    useEffect(() => {
        dispatch(fetchGetPacks({}));
    }, [page, pageCount, sortPacks]);

    // Number of cards to display
    useEffect(() => {
        setNumCards([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    return <>
        <div className="dashboard__sidebar">
            <div className="dashboard__indent">
                <Filters
                    pageCount={pageCount}
                    isCards={isCards}
                    value={numCards}
                    setValue={setNumCards}
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
