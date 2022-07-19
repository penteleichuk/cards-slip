import React, {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {FiltersCard} from "../Filters/FiltersCard";
import {CardsDraw} from "./CardsDraw";
import {fetchGetCards} from "../../../pages/card/s2-bll/CardThunks";
import {setCardsReset} from "../../../pages/card/s2-bll/CardActions";

export const CardProfile = React.memo(({isCards}: { isCards: string }) => {
    const {pageCount} = useAppSelector(state => state.card);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCardsReset({cardAnswer: undefined, cardsPack_id: isCards, sortCards: undefined, page: 1, pageCount: 6}));
        dispatch(fetchGetCards({cardsPack_id: isCards}));
    }, []);

    return <>
        <div className="dashboard__sidebar">
            <div className="dashboard__indent">
                <FiltersCard pageCount={pageCount}/>
            </div>
        </div>
        <div className="dashboard__page">
            <div className="dashboard__indent dashboard__pack">
                <CardsDraw/>
            </div>
        </div>
    </>
});
