import {PackInitState, PackInitStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state: PackInitStateType = PackInitState, action: PackActionsType): PackInitStateType => {
    switch (action.type) {
        case "PACK/SET-PACK":
            return {...state, cardPacks: [action.payload.cardsPack, ...state.cardPacks]}
        case "PACK/SET-PACKS":
        case "PACK/SET-SORT":
        case "PACK/SET-PAGINATION":
        case "PACK/SET-PER-PAGE":
        case "PACK/SET-USER-ID":
        case "PACK/SET-RESET":
        case "PACK/SET-MIN-MAX":
            return {...state, ...action.payload}
        default: {
            return state;
        }
    }
};
