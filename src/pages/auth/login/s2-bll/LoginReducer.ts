import {LoginActionsType} from './LoginActions';
import {LoginInitState, LoginStateType} from './LoginInitState';

export const loginReducer = (state = LoginInitState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case "SET-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default: {
            return {...state};
        }
    }
};
