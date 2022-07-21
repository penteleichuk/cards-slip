import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import {noPhotoImg} from "../../../assets/images";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {MeProfileType} from "../../../pages/profile/s3-dal/ProfileApi";
import {logoutTC} from "../../../pages/auth/login/s2-bll/thunks/LoginThunks";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {logoutSvg, uploadImgSvg} from "../../../assets/images/icons";
import {Popup} from "../../Popup/Popup";
import {InputText} from "../../InputText/InputText";
import {Button} from "../../Button/Button";
import {settingProfileTC} from "../../../pages/profile/s2-bll/thunks/ProfileThunks";
import './Profile.scss';

export const Profile = React.memo(() => {
    const profile = useSelector<AppStoreType, MeProfileType>(state => state.profile);
    const dispatch = useAppDispatch();

    const [popupShow, setPopupShow] = useState<boolean>(false);
    const [nameSetting, setNameSetting] = useState<string>(profile.name);

    // upload img
    const refImg = useRef<HTMLInputElement>(null);
    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        const newFile = e.target.files && e.target.files[0];

        if(newFile) {

            reader.onloadend = () => {
                dispatch(settingProfileTC({avatar: reader.result as string}));
                console.log(reader.result);
            };

            reader.readAsDataURL(newFile);
        }
    }

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, []);

    const showPopUpHandler = useCallback(() => {
        setPopupShow(true);
        setNameSetting(profile.name);
    }, [nameSetting]);

    const closePopUpHandler = useCallback(() => {
        setPopupShow(false);
    }, [nameSetting]);

    const savePopUpHandler = useCallback(() => {
        dispatch(settingProfileTC({name: nameSetting}));
        setNameSetting(profile.name);
        setPopupShow(false);
    }, [nameSetting]);

    return <div className="profile">
        <div className="dashboard__indent">
            <div className="profile__content">
                <div className="profile__row">
                    <div className="profile__image">
                        <img className="profile__img" src={profile.avatar || noPhotoImg} alt=""/>
                        <input
                            ref={refImg}
                            type={'file'}
                            style={{display: 'none'}}
                            onChange={uploadImage}
                            accept=".png, .jpg, .jpeg"
                        />
                        <button className="profile__image-update" onClick={() => refImg && refImg.current && refImg.current.click()}>
                            <img className="profile__upd" src={uploadImgSvg} alt=""/>
                        </button>
                    </div>
                    <div className="profile__body">
                        <div className="profile__name">{profile.name}</div>
                        <div className="profile__email">{profile.email}</div>
                    </div>
                </div>
                <div className="profile__buttons">
                    <button className="profile__button" onClick={showPopUpHandler}>Edit profile</button>
                    <button className="profile__button profile__logout" onClick={logoutHandler}>
                        <img src={logoutSvg} alt=""/>
                    </button>
                </div>
            </div>
        </div>

        <Popup show={popupShow} modalOnClick={closePopUpHandler} title={'Edit profile'}>
            <InputText placeholder={'Name'} value={nameSetting} onChangeText={setNameSetting}/>
            <div className="popup__buttons">
                <Button onClick={savePopUpHandler}>Confirm</Button>
                <Button onClick={closePopUpHandler}>Cancel</Button>
            </div>
        </Popup>
    </div>
});
