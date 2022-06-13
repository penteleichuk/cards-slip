import {cardInitState, CardStateType} from "./PackInitState";
import {CardActionsType} from "./CardActions";

export const cardReducer = (state: CardStateType = cardInitState, action: CardActionsType): CardStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return {...state, ...action.payload};
        case "SET-CARDS-PER-PAGE":
            return {...state, ...action.payload};
        case "ADD-NEW-CARD":
            return {...action.card, ...state}
        default:
            return state;
    }
}