import {setRegisterAC, setRegisterStatusAC} from "../RegisterActions";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import axios from "axios";
import {AppThunk} from "../../../../app/s2-bll/store";
import {InitialStateType} from "../../../../app/s2-bll/AppReducer";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/s2-bll/actions";

export const setRegisterUserTC = (userData: UserDataType):AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setRegisterStatusAC('process'))
    try {
        await registerApi.register(userData)
        dispatch(setRegisterAC(true))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setRegisterStatusAC('succeeded'))
        dispatch(setAppErrorAC(null))
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            dispatch(setAppErrorAC((err.response?.data as InitialStateType).error))
        }
        dispatch(setRegisterStatusAC('failed'))
        dispatch(setAppStatusAC('failed'))
    }
}
