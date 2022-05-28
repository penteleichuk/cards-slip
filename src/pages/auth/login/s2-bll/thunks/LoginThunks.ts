import {LoginActionsType, setLoggedInAC} from "../LoginActions";
import {Dispatch} from "redux";
import {loginApi, LoginParamsType} from "../../s3-dal/LoginApi";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";
import {ActionType} from "../../../../app/s2-bll/store";

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>) => {
    debugger
    loginApi.login(data)
        .then((res)=>{
            dispatch(setLoggedInAC(true))
        })
        .catch((err)=>{
            debugger
            dispatch(setAppErrorAC(err.response.data.error))
            console.log(err.response.data.error)
        })
};
