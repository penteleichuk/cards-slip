import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useLocation, useSearchParams} from "react-router-dom";
import {AppStoreType} from "../../app/s2-bll/store";
import {RouteNames} from "../../../constants/routes";
import {getPacksTC} from "../s2-bll/PackThunks";
import {Logo, Filters, Packs, Navigation, Cards} from "../../../components/components";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {PackInitStateType} from "../s2-bll/PackInitState";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {setSortParamsAC} from "../s2-bll/PackActions";
import './PackPage.scss';

export const PackPage = React.memo(() => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [urlParams] = useSearchParams();
    const isCards = urlParams.get('id');

    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const {
        minCardsCount,
        maxCardsCount,
        pageCount,
        page
    } = useSelector<AppStoreType, PackInitStateType>(state => state.pack);
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);
    const pageCountCard = useAppSelector(state => state.card.pageCount);
    const CountCard = useAppSelector(state => state.card.cardsTotalCount);


    useEffect(() => {
        dispatch(setSortParamsAC('0', ''))
    }, [CountCard])

    // switch page
    useEffect(() => {
        setRangeValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    // pagination
    useEffect(() => {
        dispatch(getPacksTC({page: page, pageCount: pageCount}))
    }, [page, pageCount, location]);


    // redirect login page
    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <>
            <section className="content">
                <div className="container">
                    <div className="dashboard">
                        <div className="dashboard__container">
                            <div className="header">
                                <div className="header__sidebar">
                                    <Logo isProfile={false}/>
                                </div>
                                <div className="header__navigation">
                                    <Navigation user_id={user_id} navigatePage={RouteNames.PACK}/>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <div className="dashboard__sidebar">
                                    <div className="dashboard__indent">
                                        <Filters
                                            pageCount={isCards ? pageCountCard : pageCount}
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
                                        {!isCards ? <Packs navigatePage={RouteNames.PACK}/> :
                                            <Cards navigatePage={RouteNames.PACK}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
})