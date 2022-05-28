import {RegisterActionsType} from './RegisterActions';
import {RegisterInitState, RegisterStateType} from './RegisterInitState';

export const RegisterReducer = (state = RegisterInitState, action: RegisterActionsType): RegisterStateType => {
    switch (action.type) {
        default: {
            return {...state};
        }
    }
};
