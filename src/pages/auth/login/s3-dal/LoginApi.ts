import {instance} from "../../../app/s3-dal/instance";
import {AxiosResponse} from "axios";


export const loginApi = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<LoginRequestType>>('auth/login', data)
    },
    logout() {
        return instance.delete<{info: string, error: string}>('auth/me')
    }

};
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
}

export type LoginRequestType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount?: number;
    created?: Date;
    updated?: Date;
    isAdmin?: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}



