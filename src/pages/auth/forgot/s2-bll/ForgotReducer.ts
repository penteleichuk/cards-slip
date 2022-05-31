import {ForgotInitState, ForgotStateType} from './ForgotInitState';
import {ForgotActionTypes} from "./ForgotActions";

export const forgotReducer = (state:ForgotStateType = ForgotInitState, action: ForgotActionTypes): ForgotStateType => {
    switch (action.type) {
        case "FORGOT/SEND-EMAIL":
        case "FORGOT/SET-STATUS":
        case "FORGOT/SET-ERROR":
            return {...state, ...action.payload}
        default: {
            return {...state};
        }
    }
};
