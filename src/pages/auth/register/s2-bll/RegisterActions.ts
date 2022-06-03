import {RegisterStatusType} from "./RegisterInitState";

export const setRegisterAC = (isRegistered: boolean) => ({type: 'SET-REGISTERED-USER', isRegistered} as const)
export const setRegisterStatusAC = (registerStatus: RegisterStatusType) => ({
    type: 'SET-REGISTER-STATUS',
    registerStatus
} as const)
export type RegisterActionsType =
    | ReturnType<typeof setRegisterAC>
    | ReturnType<typeof setRegisterStatusAC>