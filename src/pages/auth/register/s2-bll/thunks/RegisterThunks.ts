import {RegisterActionsType, setErrorMessageAC, setRegisterAC, setRequestStatusAC} from "../RegisterActions";
import {Dispatch} from "redux";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import {RequestStatus} from "../RegisterInitState";


export const setRegisterUserTC = (userData: UserDataType) => (dispatch: Dispatch<RegisterActionsType>) => {
    dispatch(setRequestStatusAC(RequestStatus.inProgress))
    registerApi.register(userData)
        .then(res => {
            if (res.status >= 200) {
                dispatch(setRegisterAC(true))
                dispatch(setRequestStatusAC(RequestStatus.succeeded))
                dispatch(setErrorMessageAC(null))
            }
        })
        .catch(e => {
            console.log(e)
            dispatch(setErrorMessageAC(e.response.data.error))
            dispatch(setRequestStatusAC(RequestStatus.failed))
        })
}
