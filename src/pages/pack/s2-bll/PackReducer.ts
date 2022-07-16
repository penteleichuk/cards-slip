import {PackInitState, PackInitStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state: PackInitStateType = PackInitState, action: PackActionsType): PackInitStateType => {
    switch (action.type) {
        case "SET-NEW-PACK":
            return {...state, cardPacks: [action.payload.cardsPack, ...state.cardPacks], cardPacksTotalCount: state.cardPacksTotalCount+1}
        case 'SET-SORT-PARAMS':
        case 'SET-CARDS-SORT':
        case "SET-ACTIVE-SORT-PAGE":
        case 'SET-IS-MY-CARDS-PACK':
        case "SET-CARDS-PER-PAGE":
        case "SET-CURRENT-PAGE":
        case "SET-IS-INIT":
        case "SET-PACKS":
        case "SET-MIN-MAX-CARDS":
            return {...state, ...action.payload}
        default: {
            return state;
        }
    }
};
