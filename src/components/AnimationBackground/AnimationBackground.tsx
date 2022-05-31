import './AnimationBackground.scss';
import React from "react";

export const AnimationBackground = React.memo(() => {
    return (
        <div className="area">
            <ul className="circles">
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
            </ul>
        </div>
    );
});