import {cardInitState, CardStateType} from "./CardInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return {...state, ...action.payload}
        case 'SET-CARDS-TOTAL-COUNT':
            return {...state, ...action.payload}
        case 'SET-CURRENT-CARD-PAGE':
            return {...state, ...action.payload}
        case "SET-CARDS-PER-PAGE":
            return {...state, ...action.payload}
        case "ADD-NEW-CARD":
            return {...action.card, ...state}
        case "SET-SORT-CARDS-PARAMS":
            return {...state, ...action.payload}
        default:
            return state
    }
}