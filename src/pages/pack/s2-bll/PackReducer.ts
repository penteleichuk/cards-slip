import {PackInitState, PackStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state:PackStateType = PackInitState, action: PackActionsType): PackStateType => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};