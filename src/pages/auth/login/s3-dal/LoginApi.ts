import {instance} from "../../../app/s3-dal/instance";


export const loginApi = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType>('auth/login', data)
    },
    me(){
        return instance.post<MeProfileType>('auth/me')
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
export type MeProfileType =
    {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}


