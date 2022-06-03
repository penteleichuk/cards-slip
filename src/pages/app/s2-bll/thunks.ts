import {AppThunk} from "./store";
import {loginApi} from "../../auth/login/s3-dal/LoginApi";
import {setLoggedInAC} from "../../auth/login/s2-bll/LoginActions";
import {setAppIsInitializedAC, setAppStatusAC} from "./AppReducer";

export const initializedApp = () : AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await loginApi.me();
        dispatch(setLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error){
        dispatch(setAppStatusAC('succeeded'));
    }

    dispatch(setAppIsInitializedAC(true));
}