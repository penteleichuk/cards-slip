import {RegisterActionsType, setErrorMessageAC, setRegisterAC, setRequestStatusAC} from "../RegisterActions";
import {Dispatch} from "redux";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import {RequestStatus} from "../RegisterInitState";


export const setRegisterUserTC = (userData: UserDataType) => (dispatch: Dispatch<RegisterActionsType>) => {
    dispatch(setRequestStatusAC(RequestStatus.inProgress))
    registerApi.register(userData)
        .then(() => {
                dispatch(setRegisterAC(true))
                dispatch(setRequestStatusAC(RequestStatus.succeeded))
                dispatch(setErrorMessageAC(null))
        })
        .catch(e => {
            dispatch(setErrorMessageAC(e.response.data.error))
            dispatch(setRequestStatusAC(RequestStatus.failed))
        })
}
