import {CardType} from "../s3-dal/CardApi";

// Actions creator
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const);

// Actions type
export type SetCardsActionType = ReturnType<typeof setCards>

// All types
export type CardActionsType = SetCardsActionType;