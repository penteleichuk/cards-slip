import {cardInitState, CardStateType} from "./CardInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case "CARD/SET-CARD":
            return {...state, cards: [...state.cards, action.payload.card]}
        case 'CARD/SET-CARDS':
        case "CARD/SET-RESET":
        case "CARD/SET-PER-PAGE":
        case "CARD/SET-PAGINATION":
        case "CARD/SET-SORT":
            return {...state, ...action.payload}
        case "CARD/SET-STUDY-STAGE":
            return {...state, ...action.payload}
        case "CARD/SET-CARD-GRADE":
            return {...state, cards: state.cards.map(c => c._id === action.payload.card._id ? action.payload.card : c)}
        case "CARD/SET-ACTUAL-STUDY-CARD":
            return {...state, ...action.payload}
        default:
            return state
    }
}
