import React from "react";
import {noPhotoImg} from "../../../assets/images";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {MeProfileType} from "../../../pages/profile/s3-dal/ProfileApi";
import './Profile.scss';

export const Profile = React.memo(() => {
    const profile = useSelector<AppStoreType, MeProfileType>(state => state.profile)
    // const dispatch = useAppDispatch();

    // const logoutHandler = () => {
    //     dispatch(logoutTC());
    // }

    // const changeNameHandler = (newValue:string) => {
    //     dispatch(settingProfileTC(newValue))
    // }

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
                <button>Edit profile</button>
            </div>
        </div>
    </div>
});