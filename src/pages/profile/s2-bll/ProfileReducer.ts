import {ProfileActionsType} from './ProfileActions';
import {ProfileInitState, ProfileStateType} from './ProfileInitState';

export const profileReducer = (state = ProfileInitState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "GET-PROFILE":
            return {...state, ...action.data}
        case "SET-PROFILE":
            return {...state, name: action.name, avatar: action.ava}
        default: {
            return {...state};
        }
    }
};
