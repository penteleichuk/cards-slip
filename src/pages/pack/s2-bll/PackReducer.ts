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
        case 'SET-CARDS-SORT':
            return {...state, cardPacks: action.cardPacks}
        case 'SET-SORT-PARAMS': {
            return {...state, sortCode: action.sortCode, sortType: action.sortType}
        }
        default: {
            return state;
        }
    }
};