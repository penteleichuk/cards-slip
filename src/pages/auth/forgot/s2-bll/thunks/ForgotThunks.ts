import {AppThunk} from "../../../../app/s2-bll/store";
import {forgotApi} from "../../s3-dal/ForgotApi";
import {setSendEmailForget, setStatusForget} from "../ForgotActions";
import axios from "axios";
import {setAppErrorAC} from "../../../../app/s2-bll/AppReducer";

export const sendRecoveryLink = (email: string): AppThunk => async (dispatch) => {
    dispatch(setStatusForget({status: 'process'}));

    try {
        dispatch(setSendEmailForget({sendEmail: email}));
        await forgotApi.requestRecoveryLink(email);
        dispatch(setStatusForget({status: 'success'}));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(setAppErrorAC(error.message, 'danger'));
        }

        dispatch(setStatusForget({status: 'idle'}));
    }
}
