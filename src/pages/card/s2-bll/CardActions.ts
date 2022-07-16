import {CardType} from "../s3-dal/CardApi";

// Actions creator
export const setCard = (payload: { card: CardType }) => ({type: 'SET-CARD', payload} as const);
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);

// Actions type
export type SetCardActionType = ReturnType<typeof setCard>
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>

// All types
export type CardActionsType = SetCardsActionType | SetCardsPerPageActionType | SetCardActionType;
