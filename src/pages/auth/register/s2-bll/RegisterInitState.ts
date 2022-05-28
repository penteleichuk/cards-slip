export const RegisterInitState: RegisterStateType = {
    isRegistered: false,
    requestStatus: null,
};

export type RegisterStateType = {
    isRegistered: boolean
    requestStatus: RequestStatus | null
    errorMessage?: string
}

export enum RequestStatus {
    loading = "loading",
    succeeded = "succeeded"
}