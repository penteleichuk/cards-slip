import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {DEV_VERSION} from '../../../configs/config';
import {forgotReducer} from '../../auth/forgot/s2-bll/ForgotReducer';
import {ForgotActionTypes} from "../../auth/forgot/s2-bll/ForgotActions";
import {SetPasswordActionTypes} from "../../auth/set-password/s2-bll/SetPasswordActions";
import {passwordReducer} from "../../auth/set-password/s2-bll/SetPasswordReducer";

const reducers = combineReducers({
    forgot: forgotReducer,
    password: passwordReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof reducers>;
export type AppActionType = ForgotActionTypes | SetPasswordActionTypes;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionType>;

if (DEV_VERSION) {
    // @ts-ignore
    window.store = store;
}
