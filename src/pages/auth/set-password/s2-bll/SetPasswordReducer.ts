import {SetPasswordActionTypes} from './SetPasswordActions';
import {
    SetPasswordInitState,
    SetPasswordStateType,
} from './SetPasswordInitState';

export const passwordReducer = (state:SetPasswordStateType = SetPasswordInitState, action: SetPasswordActionTypes): SetPasswordStateType => {
    switch (action.type) {
        case "PASSWORD/SET-STATUS":
        case "PASSWORD/SET-ERROR":
            return {...state, ...action.payload}
        default: {
            return {...state};
        }
    }
};
