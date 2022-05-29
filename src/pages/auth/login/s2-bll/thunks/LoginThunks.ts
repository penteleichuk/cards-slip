import {setLoggedInAC} from "../LoginActions";
import {loginApi, LoginParamsType} from "../../s3-dal/LoginApi";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/s2-bll/AppReducer";
import {AppThunk} from "../../../../app/s2-bll/store";

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await loginApi.login(data)
        dispatch(setLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
        dispatch(setAppErrorAC('Not valid email/password'))
    }
}