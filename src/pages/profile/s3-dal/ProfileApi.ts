import {instance} from "../../app/s3-dal/instance";

export const profileApi = {
    profileMe() {
        return instance.post<MeProfileType>('auth/me')
    },
    settings(name:string, avatar?:string | undefined){
        return instance.put('auth/me', {name, avatar})
    }
};
export type MeProfileType =
    {
        _id: string;
        email: string;
        name: string;
        avatar?: string | undefined;
        publicCardPacksCount: number; // количество колод
        created: DateConstructor;
        updated: DateConstructor;
        isAdmin: boolean;
        verified: boolean; // подтвердил ли почту
        rememberMe: boolean;
        error?: string;
    }