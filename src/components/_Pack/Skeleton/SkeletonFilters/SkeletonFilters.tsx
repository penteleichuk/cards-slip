import './SkeletonFilters.scss';

import React from "react";

export const SkeletonFilters = React.memo(() => {
    return <>
        <div className="sk-filters">
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
            <div className="sk-filters__box skeleton"> </div>
        </div>
    </>
});
