import React, {useEffect, useState} from "react";
import './Navigation.scss';
import {
    cardsIcon,
    clearIcon, createIcon,
    searchIcon,
    userIcon
} from "../../../assets/images/icons";
import {Input} from "../../Input/Input";
import {Tack} from "../../TackButton/Tack";
import {useDebounce} from "../../../hooks/useDebounce";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {getPacksTC} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

export const Navigation = React.memo(() => {
    const dispatch = useAppDispatch();

    const user_id = useSelector<AppStoreType, string | undefined>(state => state.login._id);
    const [search, setSearch] = useState<string | null>(null);

    const searchDebounce = useDebounce(search, 1500);
    useEffect(() => {
        if(search !== null) {
            dispatch(getPacksTC({user_id: user_id, packName: search}));
            setSearch(null);
        }
    }, [searchDebounce]);


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