import {LoginActionsType, setLoggedInAC} from "../LoginActions";
import {Dispatch} from "redux";
import {loginApi} from "../../s3-dal/LoginApi";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";
import {ActionType} from "../../../../app/s2-bll/store";

export const loginTC = (email:string, password:string, rememberMe:boolean) => (dispatch: Dispatch<ActionType>) => {
    debugger
    loginApi.login(email, password, rememberMe)
        .then((res)=>{
            dispatch(setLoggedInAC(true))
        })
        .catch((err)=>{
            debugger
            dispatch(setAppErrorAC(err.response.data.error))
            console.log(err.response.data.error)
        })
};
