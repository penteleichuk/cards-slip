import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStoreType} from "../../app/s2-bll/store";
import {RouteNames} from "../../../constants/routes";
import {getPacksTC} from "../s2-bll/PackThunks";
import {GetPackRequestType} from "../s3-dal/PackApi";
import {Logo, Filters, Packs, Navigation} from "../../../components/components";
import './PackPage.scss';
import {useAppDispatch} from "../../../hooks/useAppDispatch";

export const PackPageExample = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const paramsCards = useSelector<AppStoreType, GetPackRequestType>(state => state.pack);
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page);
    const dispatch = useAppDispatch();

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
                    <div className="dashboard profiles">
                        <div className="dashboard__container">
                            <div className="header">
                                <div className="header__sidebar">
                                    <Logo/>
                                </div>
                                <div className="header__navigation">
                                    <Navigation/>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <div className="dashboard__sidebar">
                                    <div className="dashboard__indent">
                                        {/*<Filters/>*/}
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