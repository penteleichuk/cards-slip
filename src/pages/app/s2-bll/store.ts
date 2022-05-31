import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../../configs/config';
import {forgotReducer} from '../../auth/forgot/s2-bll/ForgotReducer';
import {loginReducer} from "../../auth/login/s2-bll/LoginReducer";
import {AppActionsType, appReducer} from "./AppReducer";
import {LoginActionsType} from "../../auth/login/s2-bll/LoginActions";
import {RegisterReducer} from "../../auth/register/s2-bll/RegisterReducer";
import {passwordReducer} from "../../auth/set-password/s2-bll/SetPasswordReducer";
import {ForgotActionTypes} from "../../auth/forgot/s2-bll/ForgotActions";
import {SetPasswordActionTypes} from "../../auth/set-password/s2-bll/SetPasswordActions";

const reducers = combineReducers({
    forgot: forgotReducer,
    password: passwordReducer,
    register: RegisterReducer,
    login: loginReducer,
    app: appReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof reducers>;
export type ActionType = LoginActionsType | AppActionsType | ForgotActionTypes | SetPasswordActionTypes;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, ActionType>

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
