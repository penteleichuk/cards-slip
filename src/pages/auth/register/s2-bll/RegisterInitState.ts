export enum RequestStatus {
    idle = "idle",
    inProgress = "inProgress",
    succeeded = "succeeded",
    failed = "failed"
}

export const RegisterInitState: RegisterStateType = {
    isRegistered: false,
    requestStatus: RequestStatus.idle,
    errorMessage: null
};

export type RegisterStateType = {
    isRegistered: boolean
    requestStatus: RequestStatus
    errorMessage: string | null
}
