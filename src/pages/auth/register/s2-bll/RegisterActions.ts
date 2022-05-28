import {RequestStatus} from "./RegisterInitState";

export type RegisterActionsType =
    | ReturnType<typeof setRegisterAC>
    | ReturnType<typeof setRequestStatusAC>
    | ReturnType<typeof setErrorMessageAC>


export const setRegisterAC = (isRegistered: boolean) => ({type: 'SET-REGISTERED-USER', isRegistered} as const)
export const setRequestStatusAC = (requestStatus: RequestStatus) => ({
    type: 'SET-REQUEST-STATUS',
    requestStatus
} as const)
export const setErrorMessageAC = (errorMessage: string) => ({type: 'SET-ERROR-MESSAGE', errorMessage} as const)