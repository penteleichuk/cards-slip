import {MeProfileType} from "../s3-dal/ProfileApi";

type DefaultActionType = ReturnType<typeof profileMeAC>;
type SettingsProfileACType = ReturnType<typeof settingsProfileAC>;

export type ProfileActionsType = DefaultActionType | SettingsProfileACType;

export const profileMeAC = (data: MeProfileType) => ({type: 'GET-PROFILE', data} as const)
export const settingsProfileAC = (name: string, ava?:string) =>({type:'SET-PROFILE', name, ava}as const)