import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Button, InputText, Popup, Input, Tack} from "../../components";
import {backSvg, cardsIcon, clearIcon, createIcon, searchIcon, userIcon} from "../../../assets/images/icons";
import {useDebounce} from "../../../hooks/useDebounce";
import {addNewPackTC, getPacksTC} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {RouteNames} from "../../../constants/routes";
import {fetchAddCard, fetchCards} from "../../../pages/card/s2-bll/CardThunks";
import './Navigation.scss';

type NavigationType = {
    user_id?: string | undefined
    navigatePage: string
}

export const Navigation = React.memo(({user_id, navigatePage}: NavigationType) => {

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
    const closeModalWindowHandler = useCallback(() => {
        setShow(false);
        setQuestion('');
        setAnswer('');

        if (packId) {
            dispatch(fetchAddCard({cardsPack_id: packId, question: question, answer: answer}, packId))
        } else {
            dispatch(addNewPackTC({name: question}))
        }
    }, [packId]);

    // Cancelling and cleaning
    const deselectModalWindowHandler = useCallback(() => {
        setShow(!show)
        setQuestion('')
        setAnswer('')
    }, []);

    // Navigate handler
    const navigateComeBackHandler = useCallback(() => navigate(navigatePage, {replace: true}), []);
    const navigateProfileHandler = useCallback(() => navigate(RouteNames.PROFILE, {replace: true}), []);
    const navigateMainHandler = useCallback(() => navigate(RouteNames.PACK, {replace: true}), []);

    // Search debounce
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
                {packId && <Tack onClick={navigateComeBackHandler} iconSvg={true} iconSrc={backSvg}/>}
                <Input type={'text'}
                       iconBefore={searchIcon}
                       iconAfter={clearIcon}
                       placeholder={'Search'}
                       onChangeText={setSearch}
                />
            </div>
            <div className="header__inputs">
                <Tack onClick={navigateProfileHandler}
                      title="Profile"
                      active={
                          location.pathname === RouteNames.PROFILE ||
                          location.pathname === RouteNames.PROFILE_ARG}
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
                <Popup show={show} modalOnClick={() => { setShow(!show) }} title={packId ? 'Card info' : 'Add new pack'}>
                    <InputText placeholder={packId ? 'Question' : 'Name pack'} onChangeText={setQuestion}/>
                    {packId && <InputText name={'answer'} placeholder={'Answer'} onChangeText={setAnswer}/>}
                    <div className="popup__buttons">
                        <Button onClick={deselectModalWindowHandler}>Cancel</Button>
                        <Button onClick={closeModalWindowHandler}>Save</Button>
                    </div>
                </Popup>
            </div>
        </div>
    </div>
});
