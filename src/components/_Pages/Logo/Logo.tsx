import './Logo.scss';
import React from "react";
import {logoImg} from "../../../assets/images";
import {Profile} from "../Profile/Profile";

type LogoType = {
    isProfile: boolean
}

export const Logo = React.memo(({isProfile}: LogoType) => {
    return <div className="logo">
        <div className="dashboard__indent">
            <div className="logo__content">
                <img className={"logo__img"} src={logoImg} alt="Logo"/>
                <span className="logo__title">Cards <br/> Slip</span>
            </div>
        </div>
        {isProfile && <Profile/>}
    </div>
});