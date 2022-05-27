import {SetPasswordActionsType} from './SetPasswordActions';
import {
    SetPasswordInitState,
    SetPasswordStateType,
} from './SetPasswordInitState';

export const loginReducer = (state = SetPasswordInitState, action: SetPasswordActionsType): SetPasswordStateType => {
    switch (action.type) {
        default: {
            return {...state};
        }
    }
};
