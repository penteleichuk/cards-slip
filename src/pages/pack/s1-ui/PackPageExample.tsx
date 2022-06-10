import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useSearchParams} from "react-router-dom";
import {AppStoreType} from "../../app/s2-bll/store";
import {RouteNames} from "../../../constants/routes";
import {getPacksTC} from "../s2-bll/PackThunks";
import {Logo, Filters, Packs, Navigation} from "../../../components/components";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {PackInitStateType} from "../s2-bll/PackInitState";
import './PackPage.scss';

export const PackPageExample = React.memo(() => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const isCards = urlParams.get('id');

    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const {minCardsCount, maxCardsCount, pageCount, page} = useSelector<AppStoreType, PackInitStateType>(state => state.pack);
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    // switch page
    useEffect(() => {
        setRangeValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount]);

    // pagination
    useEffect(() => {
        dispatch(getPacksTC({page: page, pageCount: pageCount}))
    }, [page, dispatch, pageCount, ]);

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
                                    <Navigation user_id={user_id}/>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <div className="dashboard__sidebar">
                                    <div className="dashboard__indent">
                                        <Filters
                                            pageCount ={pageCount}
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
                                        <Packs/>
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