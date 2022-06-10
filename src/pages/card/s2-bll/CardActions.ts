import {CardType} from "../s3-dal/CardApi";

// Actions creator
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: {cardsTotalCount: number}) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);

// Actions type
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>

// All types
export type CardActionsType = SetCardsActionType | SetCardsPerPageActionType;