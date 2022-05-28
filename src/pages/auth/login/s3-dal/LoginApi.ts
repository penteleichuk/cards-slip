import {instance} from "../../../app/s3-dal/instance";


export const loginApi = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType<LoginParamsType>>('auth/login', data)
    }

};
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type LoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}
