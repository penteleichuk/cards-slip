import {AppThunk} from "../../../../app/s2-bll/store";
import {forgotApi} from "../../s3-dal/ForgotApi";
import {setErrorForget, setSendEmailForget, setStatusForget} from "../ForgotActions";
import axios from "axios";

export const sendRecoveryLink = (email: string): AppThunk => async (dispatch) => {
    dispatch(setStatusForget({status: 'process'}));

    try {
        dispatch(setSendEmailForget({sendEmail: email}));
        await forgotApi.requestRecoveryLink(email);
        dispatch(setStatusForget({status: 'success'}));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(setErrorForget({error: error.message}));
        }

        dispatch(setStatusForget({status: 'idle'}));
    }
}
