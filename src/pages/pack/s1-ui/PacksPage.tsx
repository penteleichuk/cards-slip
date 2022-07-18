import React from "react";
import {Navigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Logo, PackEvery} from "../../../components/components";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Navigation} from "../../../components/_Pack/Navigation/Navigation";
import './PackPage.scss';

export const PacksPage = React.memo(() => {
    const isAuth = useAppSelector(state => state.login.isLoggedIn);

    const [urlParams] = useSearchParams();
    const isCards = urlParams.get('id');

    // Redirection to authorization
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
                                    <Navigation user_id={undefined} navigatePage={RouteNames.PROFILE}/>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <PackEvery isCards={isCards}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
})
