import {ForgotStatusType} from "./ForgotInitState";

export const setStatusForget = (payload: { status: ForgotStatusType }) => {
    return {type: 'FORGOT/SET-STATUS', payload} as const;
}

export const setErrorForget = (payload: { error: string }) => {
    return {type: 'FORGOT/SET-ERROR', payload} as const;
}

export const setSendEmailForget = (payload: { sendEmail: string }) => {
    return {type: 'FORGOT/SEND-EMAIL', payload} as const;
}

type SetStatusForgetActionType = ReturnType<typeof setStatusForget>;
type SetErrorForgetActionType = ReturnType<typeof setErrorForget>;
type SetSendEmailForgetActionType = ReturnType<typeof setSendEmailForget>;
export type ForgotActionTypes = SetStatusForgetActionType | SetErrorForgetActionType | SetSendEmailForgetActionType;
