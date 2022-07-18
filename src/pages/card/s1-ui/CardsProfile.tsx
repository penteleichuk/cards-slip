import React from "react";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {Navigate, useParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Logo} from "../../../components/_Pages/Logo/Logo";
import {Navigation} from "../../../components/_Pack/Navigation/Navigation";
import {CardProfile} from "../../../components/_Card/Cards/CardProfile";

export const CardsProfile = React.memo(() => {
    const isAuth = useAppSelector(state => state.login.isLoggedIn);
    const user_id = useAppSelector(state => state.login._id);
    const isCards = useParams().id || '';

    // Redirection to authorization
    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return <>
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
                            <CardProfile isCards={isCards}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
});
