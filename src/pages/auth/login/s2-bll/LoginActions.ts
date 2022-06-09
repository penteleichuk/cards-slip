import {LoginStateType} from "./LoginInitState";

type SetLoggedInACType = ReturnType<typeof setLoggedInAC>

export type LoginActionsType = SetLoggedInACType;

export const setLoggedInAC = (data: LoginStateType) => ({
    type: 'SET-LOGGED-IN', data
} as const);
