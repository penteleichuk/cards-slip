import {RequestStatus} from "./RegisterInitState";

export const setRegisterAC = (isRegistered: boolean) => ({type: 'SET-REGISTERED-USER', isRegistered} as const)
export const setRequestStatusAC = (requestStatus: RequestStatus) => ({
    type: 'SET-REQUEST-STATUS',
    requestStatus
} as const)
export const setErrorMessageAC = (errorMessage: string | null) => ({type: 'SET-ERROR-MESSAGE', errorMessage} as const)

export type RegisterActionsType =
    | ReturnType<typeof setRegisterAC>
    | ReturnType<typeof setRequestStatusAC>
    | ReturnType<typeof setErrorMessageAC>