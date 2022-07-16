import {cardInitState, CardStateType} from "./CardInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case "SET-CARD":
            return {...state, cards: [...state.cards, action.payload.card]};
        case 'SET-CARDS':
        case "SET-CARDS-PER-PAGE":
            return {...state, ...action.payload};
        default:
            return state;
    }
}
