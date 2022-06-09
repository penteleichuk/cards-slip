import {PackInitState, PackStateType} from "./PackInitState";
import {PackActionsType} from "./PackActions";

export const packReducer = (state:PackStateType = PackInitState, action: PackActionsType): PackStateType => {
    switch (action.type) {
        case "GET-PACK-CARDS":
            return {...state, cardPacks: action.cardsPack}
        case "SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.totalCount}
        case "SET-CURRENT-PAGE":
            return {...state, page: action.currenPage}
        case "SET-IS-INIT":
        case "SET-MIN-MAX-CARDS":
            return {...state, ...action.payload};
        default: {
            return state;
        }
    }
};