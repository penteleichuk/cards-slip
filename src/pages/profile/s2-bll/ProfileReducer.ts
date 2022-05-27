import {ProfileActionsType} from './ProfileActions';
import {ProfileInitState, ProfileStateType} from './ProfileInitState';

export const loginReducer = (state = ProfileInitState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        default: {
            return {...state};
        }
    }
};
