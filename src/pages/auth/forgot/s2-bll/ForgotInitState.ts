export type ForgotStateType = {
    error: string
    status: ForgotStatusType
    sendEmail: string
};

export type ForgotStatusType = 'idle' | 'process' | 'success';

export const ForgotInitState: ForgotStateType = {
    error: '',
    status: 'idle',
    sendEmail: '',
};
