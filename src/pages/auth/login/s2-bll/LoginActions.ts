type SetLoggedInACType = ReturnType<typeof setLoggedInAC>

export type LoginActionsType = SetLoggedInACType;

export const setLoggedInAC = (value: boolean) => ({
    type: 'SET-LOGGED-IN', value
} as const);
