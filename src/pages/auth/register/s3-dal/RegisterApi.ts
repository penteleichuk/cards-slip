import {instance} from "../../../app/s3-dal/instance";

export const registerApi = {
    register(userData: UserDataType) {
        return instance.post<RegisterResponseType>('auth/register', userData )
    }
}

export type UserDataType = {
    email: string
    password: string
}

type addedUserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}

type DataType = {
    addedUser: addedUserType
    error?: string
}

type RegisterResponseType = {
    data: DataType
}
