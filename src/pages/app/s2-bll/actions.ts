import {AlertStyleType} from "../../../components/Alert/Alert";
import {RequestStatusType} from "./AppReducer";

export const setAppErrorAC = (message: string | null, style: AlertStyleType = 'primary') => ({type: 'APP/SET-ERROR', message, style} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedACType = ReturnType<typeof setAppIsInitializedAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppIsInitializedACType