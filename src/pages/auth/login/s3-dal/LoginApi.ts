import {instance} from "../../../app/s3-dal/instance";


export const loginApi = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType>('auth/login', data)
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



