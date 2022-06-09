import React, {useEffect, useState} from "react";
import './Navigation.scss';
import {
    backSvg,
    cardsIcon,
    clearIcon, createIcon,
    searchIcon,
    userIcon
} from "../../../assets/images/icons";
import {Input} from "../../Input/Input";
import {Tack} from "../../TackButton/Tack";
import {useDebounce} from "../../../hooks/useDebounce";
import {getPacksTC} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";

type NavigationType = {
    user_id: string | undefined
}

export const Navigation = React.memo(({user_id}: NavigationType) => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const navigate = useNavigate();
    const packId = urlParams.get('id');

    const [search, setSearch] = useState<string | null>(null);

    const goBackHandler = () => {
        return navigate(RouteNames.PROFILE);
    }

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
                {packId && <Tack onClick={goBackHandler} iconSvg={true} iconSrc={backSvg}/>}
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