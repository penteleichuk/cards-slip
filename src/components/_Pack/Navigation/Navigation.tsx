import React, {useState} from "react";
import './Navigation.scss';
import {
    cardsIcon,
    clearIcon, createIcon,
    searchIcon,
    userIcon
} from "../../../assets/images/icons";
import {Input} from "../../Input/Input";
import {Tack} from "../../TackButton/Tack";

export const Navigation = React.memo(() => {
    const [search, setSearch] = useState<string>('');

    return <div className="dashboard__indent">
        <div className="header__content">
            <div className="header__search">
                <Input type={'text'}
                       iconBefore={searchIcon}
                       iconAfter={clearIcon}
                       placeholder={'Search'}
                       onChangeText={setSearch}
                />
            </div>
            <div className="header__inputs">
                <Tack title="Profile" active={true} iconSrc={userIcon}/>
                <Tack title="Pack lists" iconSrc={cardsIcon}/>
                <Tack iconSrc={createIcon}/>
            </div>
        </div>
    </div>
});