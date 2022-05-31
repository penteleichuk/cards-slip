import {instance} from "../../../app/s3-dal/instance";
import {AxiosResponse} from "axios";
import {appURL} from "../../../../configs/config";

export const forgotApi = {
    requestRecoveryLink(email: string) {
        return instance.post<{ email: string, from: string }, AxiosResponse<RequestType>>('auth/forgot',
            {
                email,
                from: "Cards slip 🤹🏼 <admin@gmail.com>",
                message: `<div style="background-color: lime; padding: 15px">
                            password recovery link:<a href='${appURL}#/set-new-password/$token$'> link</a>
                          </div>`
            });
    }
};

export type RequestType = {
    info: string
    error: string
}