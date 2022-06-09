import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useSearchParams} from "react-router-dom";
import {AppStoreType} from "../../app/s2-bll/store";
import {RouteNames} from "../../../constants/routes";
import {getPacksTC} from "../s2-bll/PackThunks";
import {GetPackRequestType} from "../s3-dal/PackApi";
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
    const paramsCards = useSelector<AppStoreType, GetPackRequestType>(state => state.pack);
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page);
    const {minCardsCount, maxCardsCount} = useSelector<AppStoreType, PackInitStateType>(state => state.pack);
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount]);

    useEffect(() => {
        dispatch(getPacksTC({page: currentPage, pageCount: paramsCards.pageCount}))
    }, [currentPage, dispatch, paramsCards.pageCount]);


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