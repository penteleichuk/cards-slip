import {RegisterActionsType} from './RegisterActions';
import {RegisterInitState, RegisterStateType} from './RegisterInitState';

export const RegisterReducer = (state = RegisterInitState, action: RegisterActionsType): RegisterStateType => {
    switch (action.type) {
        case('SET-REGISTERED-USER'):
            return {...state, isRegistered: action.isRegistered }
        case('SET-REQUEST-STATUS'):
            return {...state, requestStatus: action.requestStatus  }
        case('SET-ERROR-MESSAGE'):
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}
