import {ForgotStatusType} from "../../forgot/s2-bll/ForgotInitState";

export type SetPasswordStateType = {
    error: string
    status: ForgotStatusType
};

export const SetPasswordInitState: SetPasswordStateType = {
    error: '',
    status: 'idle'
};
