export const RegisterInitState: RegisterStateType = {
    registerStatus: null
}

export type RegisterStateType = {
    registerStatus: RegisterStatusType | null
}

export enum RegisterStatusType {
    inProgress = "inProgress",
    success = "success",
    failed = "failed"
}