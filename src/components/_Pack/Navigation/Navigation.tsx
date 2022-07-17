import React, {useEffect, useState} from "react";
import './Navigation.scss';
import {backSvg, cardsIcon, clearIcon, createIcon, searchIcon, userIcon} from "../../../assets/images/icons";
import {Input} from "../../Input/Input";
import {Tack} from "../../TackButton/Tack";
import {useDebounce} from "../../../hooks/useDebounce";
import {addPackTC, getPacksTC} from "../../../pages/pack/s2-bll/PackThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {Popup} from "../../Popup/Popup";
import {InputText} from "../../InputText/InputText";
import {Button} from "../../components";
import {addCardTC, getCards} from "../../../pages/card/s2-bll/CardThunks";

type NavigationType = {
    user_id?: string | undefined
    navigatePage: string
}

export const Navigation = React.memo(({user_id, navigatePage}: NavigationType) => {
    const dispatch = useAppDispatch();
    const [urlParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const packId = urlParams.get('id');


    //for modal
    const [show, setShow] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const clickAddPackHandler = () => {
        setShow(true)
    }
    const clickCloseModalHandler = () => {
        setShow(false);
        setQuestion('')
        setAnswer('')
        if (packId) {
            dispatch(addCardTC({cardsPack_id: packId, question: question, answer: answer}, packId))
        } else {
            dispatch(addPackTC({name: question}))
        }
    }
    const changeValue = (value: string) => {
        setQuestion(value)
    }
    const clickCancelHandler = () => {
        setShow(!show)
        setQuestion('')
        setAnswer('')
    }

    const [search, setSearch] = useState<string | null>(null);

    const goBackHandler = () => {
        return navigate(navigatePage, {replace: true});
    }

    const goToProfile = () => {
        return navigate(RouteNames.PROFILE, {replace: true});
    }

    const goToMain = () => {
        return navigate(RouteNames.PACK, {replace: true});
    }

    const searchDebounce = useDebounce(search, 1500);
    useEffect(() => {
        if (search !== null) {
            if (packId) {
                dispatch(getCards({cardsPack_id: packId, cardAnswer: search}));
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
                <Tack iconSrc={createIcon} onClick={clickAddPackHandler}/>

                <Popup show={show} modalOnClick={() => {
                    setShow(!show)
                }} title={packId ? 'Card info' : 'Add new pack'}>

                    <InputText placeholder={packId ? 'Question' : 'Name pack'} onChangeText={changeValue}/>
                    {packId && <InputText style={{marginTop: '15px'}} name={'answer'} placeholder={'Answer'}
                                          onChangeText={(value) => {
                                              setAnswer(value)
                                          }}/>}
                    <div>
                        <Button style={{margin: '10px'}} onClick={clickCancelHandler}>Cancel</Button>
                        <Button onClick={clickCloseModalHandler}>Save</Button>
                    </div>
                </Popup>
            </div>
        </div>
    </div>
});