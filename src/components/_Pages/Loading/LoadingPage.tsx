import './LoadingPage.scss';
import React from "react";

export const LoadingPage = React.memo(() => {
    return <div className="content loading-page">
            <div className="lds-ripple"><div></div><div></div></div>
    </div>
})