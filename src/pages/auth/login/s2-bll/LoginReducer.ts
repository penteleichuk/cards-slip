import {LoginActionsType} from './LoginActions';
import {LoginInitState, LoginStateType} from './LoginInitState';

export const loginReducer = (state: LoginStateType = LoginInitState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case "SET-LOGGED-IN":
            return {...action.data}
        default: {
            return {...state};
        }
    }
};
