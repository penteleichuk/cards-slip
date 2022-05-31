import {setLoggedInAC} from "../LoginActions";
import {loginApi, LoginParamsType} from "../../s3-dal/LoginApi";
import {InitialStateType, setAppErrorAC, setAppStatusAC} from "../../../../app/s2-bll/AppReducer";
import {AppThunk} from "../../../../app/s2-bll/store";
import axios from "axios";

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await loginApi.login(data)
        dispatch(setLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            dispatch(setAppErrorAC((err.response?.data as InitialStateType).error))
        }
    }
}