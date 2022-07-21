import {ProfileActionsType} from './ProfileActions';
import {ProfileInitState, ProfileStateType} from './ProfileInitState';

export const profileReducer = (state = ProfileInitState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "GET-PROFILE":
            return {...state, ...action.data}
        case "SET-PROFILE":
            return {...state, ...action.payload}
        default: {
            return {...state};
        }
    }
};
