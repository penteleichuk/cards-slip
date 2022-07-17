import {PackInitState, PackInitStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state: PackInitStateType = PackInitState, action: PackActionsType): PackInitStateType => {
    switch (action.type) {
        case "SET-NEW-PACK":
            return {...state, cardPacks: [action.payload.cardsPack, ...state.cardPacks], cardPacksTotalCount: state.cardPacksTotalCount+1}
        case "SET-PACKS-SORT":
        case "SET-CARDS-PER-PAGE":
        case "SET-CURRENT-PAGE":
        case "SET-PACKS":
        case "SET-MIN-MAX-CARDS":
            return {...state, ...action.payload}
        default: {
            return state;
        }
    }
};
