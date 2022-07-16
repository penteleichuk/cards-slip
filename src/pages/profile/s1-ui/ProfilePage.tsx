import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {getPacksTC} from "../../pack/s2-bll/PackThunks";
import {Navigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Logo} from "../../../components/_Pages/Logo/Logo";
import {Navigation} from "../../../components/_Pack/Navigation/Navigation";
import {Filters} from "../../../components/_Pack/Filters/Filters";
import {Packs} from "../../../components/_Pack/Packs/Packs";
import {Cards} from "../../../components/components";
import {PackInitStateType} from "../../pack/s2-bll/PackInitState";
import {CardStateType} from "../../card/s2-bll/CardInitState";
import {setSortParamsAC} from "../../pack/s2-bll/PackActions";

export const ProfilePage = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);

    const [urlParams] = useSearchParams();
    const isCards = urlParams.get('id');

    const dispatch = useAppDispatch();

    const {
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
    } = useSelector<AppStoreType, PackInitStateType>(state => state.pack);

    const pageCountCards = useSelector<AppStoreType, CardStateType>(state => state.card).pageCount;
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    // Card loading
    useEffect(() => {
        dispatch(setSortParamsAC({sortCode: '0', sortType: ''}));
        dispatch(getPacksTC({user_id, page, pageCount}));
    }, [dispatch])

    // Number of cards to display
    useEffect(() => {
        setRangeValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    // Redirection to authorization
    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <>
            <section className="content">
                <div className="container">
                    <div className="dashboard profiles">
                        <div className="dashboard__container">
                            <div className="header">
                                <div className="header__sidebar">
                                    <Logo isProfile={true}/>
                                </div>
                                <div className="header__navigation">
                                    <Navigation user_id={user_id} navigatePage={RouteNames.PROFILE}/>
                                </div>
                            </div>
                            <div className="dashboard__content">
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
                                        {!isCards ? <Packs navigatePage={RouteNames.PROFILE}/> :
                                            <Cards navigatePage={RouteNames.PROFILE}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
});
