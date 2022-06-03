import {AlertStyleType} from "../../../components/Alert/Alert";

const initialState: InitialStateType = {
    status: 'idle',
    error: '',
    style: 'primary',
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.message, style: action.style}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    style: AlertStyleType,
    isInitialized: boolean
}

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
