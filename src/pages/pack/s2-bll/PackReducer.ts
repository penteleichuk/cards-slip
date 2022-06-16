import {PackInitState, PackInitStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state: PackInitStateType = PackInitState, action: PackActionsType): PackInitStateType => {
    switch (action.type) {
        case "GET-PACK-CARDS":
            return {...state, cardPacks: action.cardsPack}
        case "SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.totalCount}
        case "SET-CURRENT-PAGE":
            return {...state, page: action.currenPage}
        case "SET-CARDS-PER-PAGE":
            return {...state, pageCount: action.totalCards}
        case 'SET-CARDS-SORT':
            return {...state, cardPacks: action.cardPacks}
        case 'SET-SORT-PARAMS':
            return {...state, sortCode: action.sortCode, sortType: action.sortType}
        case 'SET-IS-MY-CARDS-PACK':
            return {...state, isMyCardsPack: action.isMyCardsPack}
        case "SET-ACTIVE-SORT-PAGE":
            return {...state, activeSortPage: action.activeSortPage}
        case "REMOVE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.packId)}
        case "CHANGE-PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => p._id === action.packId ? {...p, name: action.newPackName} : p)
            }
        case "SET-IS-INIT":
        case "SET-MIN-MAX-CARDS":
            return {...state, ...action.payload};
        default: {
            return state;
        }
    }
};