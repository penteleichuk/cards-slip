import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { DEV_VERSION } from '../../../configs/config';
import { forgotReducer } from '../../auth/forgot/s2-bll/ForgotReducer';

const reducers = combineReducers({
	forgot: forgotReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AppStoreType = ReturnType<typeof reducers>;

if (DEV_VERSION) {
	// @ts-ignore
	window.store = store;
}
