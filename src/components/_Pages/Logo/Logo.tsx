import './Logo.scss';
import React from "react";
import {logoImg} from "../../../assets/images";
import {Profile} from "../Profile/Profile";

export const Logo = React.memo(() => {
    return <div className="logo">
        <div className="dashboard__indent">
            <div className="logo__content">
                <img className={"logo__img"} src={logoImg} alt="Logo"/>
                <span className="logo__title">Cards <br/> Slip</span>
            </div>
        </div>
        <Profile/>
    </div>
});