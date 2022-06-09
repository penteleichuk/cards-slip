import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import './PackButton.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PackButtonType = DefaultButtonPropsType & {
    title?: string
    iconSrc: string
}

export const PackButton = React.memo(({title, iconSrc, ...restProps}: PackButtonType) => {
    return <button className="pack-button" {...restProps}>
        {title}
        <img className="pack-button__img" src={iconSrc} alt=""/>
    </button>
})