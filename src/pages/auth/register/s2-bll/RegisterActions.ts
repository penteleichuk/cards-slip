type userDataType = {
    email: string
    password: string
}

type setRegisterActionType = {
    type: 'SET-REGISTER-USER'
    userData: userDataType
}

export type RegisterActionsType = setRegisterActionType;


const setRegisterUserAC = (userData: userDataType) => ({ type: 'SET-REGISTER-USER',  userData} as const)