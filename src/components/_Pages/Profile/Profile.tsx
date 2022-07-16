import React, {useState} from "react";
import {noPhotoImg} from "../../../assets/images";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {MeProfileType} from "../../../pages/profile/s3-dal/ProfileApi";
import {logoutTC} from "../../../pages/auth/login/s2-bll/thunks/LoginThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutSvg} from "../../../assets/images/icons";
import {Popup} from "../../Popup/Popup";
import {InputText} from "../../InputText/InputText";
import {Button} from "../../Button/Button";
import {settingProfileTC} from "../../../pages/profile/s2-bll/thunks/ProfileThunks";
import './Profile.scss';

export const Profile = React.memo(() => {
    const profile = useSelector<AppStoreType, MeProfileType>(state => state.profile);
    const dispatch = useAppDispatch();

    const [popupShow, setPopupShow] = useState<boolean>(false);
    const [name, setName] = useState<string>(profile.name);

    const logoutHandler = () => {
        dispatch(logoutTC());
    }

    const showPopUpHandler = () => {
        setPopupShow(true);
        setName(profile.name);
    }

    const closePopUpHandler = () => {
        setPopupShow(false);
        setName(profile.name);
    }

    const savePopUpHandler = () => {
        dispatch(settingProfileTC(name));
        setName(profile.name);
        setPopupShow(false);
    }

    return <div className="profile">
        <div className="dashboard__indent">
            <div className="profile__content">
                <div className="profile__row">
                    <div className="profile__image">
                        <img src={profile.avatar || noPhotoImg} alt=""/>
                    </div>
                    <div className="profile__body">
                        <div className="profile__name">{profile.name}</div>
                        <div className="profile__email">{profile.email}</div>
                    </div>
                </div>
                <div className="profile__buttons">
                    <button onClick={showPopUpHandler}>Edit profile</button>
                    <button className="profile__logout" onClick={logoutHandler}>
                        <img src={logoutSvg} alt=""/>
                    </button>
                </div>
            </div>
        </div>

        <Popup show={popupShow} modalOnClick={closePopUpHandler} title={'Edit profile'}>
            <InputText placeholder={'Name'} value={name} onChangeText={setName}/>
            <div className="popup__buttons">
                <Button onClick={savePopUpHandler}>Save</Button>
                <Button onClick={closePopUpHandler}>Cancel</Button>
            </div>
        </Popup>
    </div>
});
