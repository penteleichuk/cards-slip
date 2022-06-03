export const RegisterInitState: RegisterStateType = {
    isRegistered: false,
    registerStatus: 'idle'
}

export type RegisterStatusType = 'idle' | 'process' | 'success' | 'failed';

export type RegisterStateType = {
    isRegistered: boolean
    registerStatus: RegisterStatusType
}
