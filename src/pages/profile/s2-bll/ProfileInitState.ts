import {MeProfileType} from "../s3-dal/ProfileApi";

export type ProfileStateType = typeof ProfileInitState;

export const ProfileInitState:MeProfileType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод
    created: Date,
    updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: '', // количество колод
};
