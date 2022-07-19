import React, {useEffect, useState} from "react";
import {FiltersPack} from "../Filters/FiltersPack";
import {PacksDraw} from "./PacksDraw";
import {RouteNames} from "../../../constants/routes";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setPacksReset} from "../../../pages/pack/s2-bll/PackActions";
import {fetchGetPacks} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppSelector} from "../../../hooks/useAppSelector";

export const PackProfile = React.memo(({isCards}: { isCards: string | null }) => {
    const {minCardsCount, maxCardsCount, pageCount} = useAppSelector(state => state.pack);
    const user_id = useAppSelector(state => state.login._id);
    const [numCards, setNumCards] = useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPacksReset({packName: undefined, user_id, sortPacks: '', pageCount: 6, page: 1}));
        dispatch(fetchGetPacks({}));
    }, []);

    // Number of cards to display
    useEffect(() => {
        setNumCards([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    return <>
        <div className="dashboard__sidebar">
            <div className="dashboard__indent">
                <FiltersPack
                    pageCount={pageCount}
                    isCards={isCards}
                    user_id={user_id}
                    value={numCards}
                    setValue={setNumCards}
                    minCardsCount={minCardsCount}
                    maxCardsCount={maxCardsCount}
                />
            </div>
        </div>
        <div className="dashboard__page">
            <div className="dashboard__indent dashboard__pack">
                <PacksDraw navigatePage={RouteNames.PROFILE}/>
            </div>
        </div>
    </>
});
