import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Button, InputText, Popup, Input, Tack} from "../../components";
import {backSvg, cardsIcon, clearIcon, createIcon, searchIcon, userIcon} from "../../../assets/images/icons";
import {useDebounce} from "../../../hooks/useDebounce";
import {fetchCreatePack, fetchGetPacks} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {RouteNames} from "../../../constants/routes";
import {fetchCreateCard, fetchGetCards} from "../../../pages/card/s2-bll/CardThunks";
import './Navigation.scss';

type NavigationType = {
    user_id?: string | undefined
    navigatePage: string
}

export const Navigation = React.memo(({navigatePage}: NavigationType) => {

    // Search
    const [search, setSearch] = useState<string | null>(null);
    const searchDebounce = useDebounce(search, 1500);

    // Modal window
    const [show, setShow] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    // Location (route)
    const navigate = useNavigate();
    const location = useLocation();
    const [urlParams] = useSearchParams();
    const packId = urlParams.get('id');

    const dispatch = useAppDispatch();

    // Close modal window and cleaning
    const createHandler = useCallback(() => {
        setShow(false);
        setQuestion('');
        setAnswer('');

        if (packId) {
            dispatch(fetchCreateCard({cardsPack_id: packId, question: question, answer: answer}, packId))
        } else {
            dispatch(fetchCreatePack({name: question}))
        }
    }, []);

    // Cancelling and cleaning
    const deselectModalWindowHandler = useCallback(() => {
        setShow(false);
        setQuestion('');
        setAnswer('');
    }, []);

    // Navigate handler
    const navigateComeBackHandler = useCallback(() => navigate(navigatePage, {replace: true}), []);
    const navigateProfileHandler = useCallback(() => navigate(RouteNames.PROFILE, {replace: true}), []);
    const navigateMainHandler = useCallback(() => navigate(RouteNames.PACK, {replace: true}), []);

    // Search debounce
    useEffect(() => {
        if (search !== null) {
            if (packId) {
                dispatch(fetchGetCards({cardsPack_id: packId, cardAnswer: search}));
            } else {
                dispatch(fetchGetPacks({packName: search}));
            }

            setSearch(null);
        }
    }, [searchDebounce]);

    return <div className="dashboard__indent">
        <div className="header__content">
            <div className="header__search">
                {packId && <Tack onClick={navigateComeBackHandler} iconSvg={true} iconSrc={backSvg}/>}
                <Input type={'text'} iconBefore={searchIcon} iconAfter={clearIcon} placeholder={'Search'} onChangeText={setSearch}/>
            </div>
            <div className="header__inputs">
                <Tack onClick={navigateProfileHandler}
                      title="Profile"
                      active={location.pathname === RouteNames.PROFILE || location.pathname === RouteNames.PROFILE_ARG}
                      iconSrc={userIcon}
                />
                <Tack onClick={navigateMainHandler}
                      title="Pack lists"
                      iconSrc={cardsIcon}
                      active={
                          location.pathname === RouteNames.PACK ||
                          location.pathname === RouteNames.CARDS_ARG ||
                          location.pathname === RouteNames.CARDS
                      }
                />

                <Tack iconSrc={createIcon} onClick={() => setShow(true)}/>

                <Popup show={show} modalOnClick={deselectModalWindowHandler} title={packId ? 'Card info' : 'Add new pack'}>
                    <InputText placeholder={packId ? 'Question' : 'Name pack'} value={question} onChangeText={setQuestion}/>
                    {packId && <InputText name={'answer'} placeholder={'Answer'} value={answer} onChangeText={setAnswer}/>}
                    <div className="popup__buttons">
                        <Button onClick={deselectModalWindowHandler}>Cancel</Button>
                        <Button onClick={createHandler}>Save</Button>
                    </div>
                </Popup>

            </div>
        </div>
    </div>
});
