import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import {Navigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Logo} from "../../../components/_Pages/Logo/Logo";
import {Navigation} from "../../../components/_Pack/Navigation/Navigation";
import {PackProfile} from "../../../components/components";

export const ProfilePage = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);

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
                                <PackProfile isCards={isCards} />
                                {/*<PackAll isCards={isCards}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
});
