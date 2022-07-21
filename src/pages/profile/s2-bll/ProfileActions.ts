import {MeProfileType, RequestUpdateProfile} from "../s3-dal/ProfileApi";

type DefaultActionType = ReturnType<typeof profileMeAC>;
type SettingsProfileACType = ReturnType<typeof settingsProfileAC>;

export type ProfileActionsType = DefaultActionType | SettingsProfileACType;

export const profileMeAC = (data: MeProfileType) => ({type: 'GET-PROFILE', data} as const)
export const settingsProfileAC = (payload: RequestUpdateProfile) => ({type: 'SET-PROFILE', payload} as const);
