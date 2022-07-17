import {cardInitState, CardStateType} from "./CardInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case "CARD/SET-CARD":
            return {...state, cards: [...state.cards, action.payload.card]};
        case 'CARD/SET-CARDS':
        case "CARD/SET-PER-PAGE":
            return {...state, ...action.payload};
        default:
            return state;
    }
}
