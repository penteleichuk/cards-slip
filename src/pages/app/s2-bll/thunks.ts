import {AppThunk} from "./store";
import {loginApi} from "../../auth/login/s3-dal/LoginApi";
import {setLoggedInAC} from "../../auth/login/s2-bll/LoginActions";
import {setAppStatusAC} from "./AppReducer";

export const initializeAppTC = () : AppThunk =>async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
       const res =  await loginApi.me()
        console.log(res)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setLoggedInAC(true))
    }catch (e){
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setLoggedInAC(false))
        console.log(e)
    }
}