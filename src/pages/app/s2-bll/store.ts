import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../../configs/config';
import {forgotReducer} from '../../auth/forgot/s2-bll/ForgotReducer';
import {loginReducer} from "../../auth/login/s2-bll/LoginReducer";
import {AppActionsType, appReducer} from "./AppReducer";
import {LoginActionsType} from "../../auth/login/s2-bll/LoginActions";

const reducers = combineReducers({
    forgot: forgotReducer,
    login: loginReducer,
    app: appReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof reducers>;
export type ActionType = LoginActionsType | AppActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, ActionType>

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
