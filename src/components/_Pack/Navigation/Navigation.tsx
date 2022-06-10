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
import {useLocation, useNavigate, useSearchParams, Navigate as NavigateRoute} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {fetchCards} from "../../../pages/card/s2-bll/PackThunks";

type NavigationType = {
    user_id?: string | undefined
}

export const Navigation = React.memo(({user_id}: NavigationType) => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const packId = urlParams.get('id');

    const [search, setSearch] = useState<string | null>(null);

    const goBackHandler = () => {
        return navigate(RouteNames.PROFILE, {replace: true});
    }

    const goToProfile = () => {
        return navigate(RouteNames.PROFILE, {replace: true});
    }

    const goToMain = () => {
        return navigate(RouteNames.PACK, {replace: true});
    }
    // console.log(location.pathname.includes(RouteNames.PROFILE), location, RouteNames.PROFILE_ARG)
    const searchDebounce = useDebounce(search, 1500);
    useEffect(() => {
        if (search !== null) {
            if (packId) {
                dispatch(fetchCards({cardsPack_id: packId, cardAnswer: search}));
            } else if (location.pathname === RouteNames.PROFILE || location.pathname === RouteNames.PROFILE_ARG) {
                dispatch(getPacksTC({user_id: user_id, packName: search}));
            } else {
                dispatch(getPacksTC({packName: search}));
            }

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
                <Tack onClick={goToProfile}
                      title="Profile"
                      active={
                          location.pathname === RouteNames.PROFILE ||
                          location.pathname === RouteNames.PROFILE_ARG}
                      iconSrc={userIcon}
                />
                <Tack onClick={goToMain}
                      title="Pack lists"
                      iconSrc={cardsIcon}
                      active={
                          location.pathname === RouteNames.PACK ||
                          location.pathname === RouteNames.CARDS_ARG ||
                          location.pathname === RouteNames.CARDS
                      }
                />
                <Tack iconSrc={createIcon} onClick={()=>alert('add pack')}/>
            </div>
        </div>
    </div>
});