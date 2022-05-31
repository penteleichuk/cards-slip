import {instance} from "../../../app/s3-dal/instance";
import {AxiosResponse} from "axios";
import {RequestType} from "../../forgot/s3-dal/ForgotApi";

export const setPasswordApi = {
    requestNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ password: string, resetPasswordToken: string }, AxiosResponse<RequestType>>('/auth/set-new-password', {
            password,
            resetPasswordToken
        });
    }
};
