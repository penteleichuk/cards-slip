import {RegisterActionsType} from './RegisterActions';
import {RegisterInitState, RegisterStateType} from './RegisterInitState';

export const registerReducer = (state = RegisterInitState, action: RegisterActionsType): RegisterStateType => {
    switch (action.type) {
        case('SET-REGISTERED-USER'):
            return {...state, isRegistered: action.isRegistered }
        default:
            return state
    }
}