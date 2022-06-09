import {setLoggedInAC} from "../LoginActions";
import {loginApi, LoginParamsType} from "../../s3-dal/LoginApi";
import {InitialStateType} from "../../../../app/s2-bll/AppReducer";
import {AppThunk} from "../../../../app/s2-bll/store";
import axios from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/s2-bll/actions";
import {initializedApp} from "../../../../app/s2-bll/thunks";

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
         await loginApi.login(data)
        dispatch(initializedApp())
        dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
        dispatch(setAppStatusAC('succeeded'))
        if (axios.isAxiosError(err) && err.response) {
            dispatch(setAppErrorAC((err.response?.data as InitialStateType).error))
        }
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await loginApi.logout()
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setLoggedInAC({_id: "", isLoggedIn: true}))
    } catch (err) {
        dispatch(setAppStatusAC('succeeded'))
        if (axios.isAxiosError(err) && err.response) {
            dispatch(setAppErrorAC((err.response?.data as InitialStateType).error))
        }
    }
}