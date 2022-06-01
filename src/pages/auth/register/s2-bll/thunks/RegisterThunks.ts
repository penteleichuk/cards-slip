import {setRegisterAC} from "../RegisterActions";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import axios from "axios";
import {AppThunk} from "../../../../app/s2-bll/store";
import {InitialStateType, setAppErrorAC, setAppStatusAC} from "../../../../app/s2-bll/AppReducer";

export const setRegisterUserTC = (userData: UserDataType):AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await registerApi.register(userData)
        dispatch(setRegisterAC(true))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppErrorAC(null));
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            dispatch(setAppErrorAC((err.response?.data as InitialStateType).error))
        }
        dispatch(setAppStatusAC('failed'))
    }
}
