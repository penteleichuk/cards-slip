import {RegisterActionsType, setErrorMessageAC, setRegisterAC, setRequestStatusAC} from "../RegisterActions";
import {Dispatch} from "redux";
import {registerApi, UserDataType} from "../../s3-dal/RegisterApi";
import {RequestStatus} from "../RegisterInitState";

export const setRegisterUserTC = (userData: UserDataType) => (dispatch: Dispatch<RegisterActionsType>) => {
    dispatch(setRequestStatusAC(RequestStatus.loading))
    registerApi.register(userData)
        .then( res => {
            if(res.status >= 200) {
                console.log(res)
                dispatch(setRegisterAC(true))
                dispatch(setRequestStatusAC(RequestStatus.succeeded))
            }
        })
        .catch( e => {
            dispatch(setErrorMessageAC(e.response.data.error))
            console.error(e)
        })
}
