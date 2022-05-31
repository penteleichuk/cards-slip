import {ForgotStatusType} from "../../forgot/s2-bll/ForgotInitState";

export const setStatusPassword = (payload: { status: ForgotStatusType }) => {
    return {type: 'PASSWORD/SET-STATUS', payload} as const;
}

export const setErrorPassword = (payload: { error: string }) => {
    return {type: 'PASSWORD/SET-ERROR', payload} as const;
}

type SetStatusPasswordActionType = ReturnType<typeof setStatusPassword>;
type SetErrorPasswordActionType = ReturnType<typeof setErrorPassword>;
export type SetPasswordActionTypes = SetStatusPasswordActionType | SetErrorPasswordActionType;