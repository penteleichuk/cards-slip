export const setRegisterAC = (isRegistered: boolean) => ({type: 'SET-REGISTERED-USER', isRegistered} as const)

export type RegisterActionsType =
    | ReturnType<typeof setRegisterAC>