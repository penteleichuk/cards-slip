import axios from "axios";
import {AppThunk} from "../../../../app/s2-bll/store";
import {setStatusPassword} from "../SetPasswordActions";
import {setPasswordApi} from "../../s3-dal/SetPasswordApi";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";

export const sendResetPassword = (password: string, token: string): AppThunk => async (dispatch) => {
    dispatch(setStatusPassword({status: 'process'}));

    try {
        await setPasswordApi.requestNewPassword(password, token);
        dispatch(setStatusPassword({status: 'success'}));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(setAppErrorAC(error.message, error.message));
        }
        dispatch(setStatusPassword({status: 'idle'}));
    }
}