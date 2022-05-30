import {RegisterActionsType, setErrorMessageAC, setRegisterAC, setRequestStatusAC} from "../RegisterActions";
import {Dispatch} from "redux";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import {RequestStatus} from "../RegisterInitState";
import axios from "axios";

type TodoErrorResponse = {
    error: string
}

export const setRegisterUserTC = (userData: UserDataType) => async (dispatch: Dispatch<RegisterActionsType>) => {
    dispatch(setRequestStatusAC(RequestStatus.inProgress))
    try {
        await registerApi.register(userData)
        dispatch(setRegisterAC(true))
        dispatch(setRequestStatusAC(RequestStatus.succeeded))
        dispatch(setErrorMessageAC(null))
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            console.log(err.response?.data)
            dispatch(setErrorMessageAC((err.response?.data as TodoErrorResponse).error))
        }
        dispatch(setRequestStatusAC(RequestStatus.failed))
    }
}
