import {cardInitState, CardStateType} from "./CardInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return {...state, ...action.payload};
        case "SET-CARDS-PER-PAGE":
            return {...state, ...action.payload}
        case "REMOVE-CARD":
            return {...state, cards: state.cards.filter(c => c._id !== action.cardId)}
        default:
            return state;
    }
}