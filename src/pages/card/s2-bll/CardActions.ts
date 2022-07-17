import {CardType} from "../s3-dal/CardApi";

// Actions creator
export const setCard = (payload: { card: CardType }) => ({type: 'CARD/SET-CARD', payload} as const);
export const setCards = (payload: { cards: CardType[] }) => ({type: 'CARD/SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'CARD/SET-PER-PAGE', payload} as const);

// Actions type
export type SetCardActionType = ReturnType<typeof setCard>
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>

// All types
export type CardActionsType = SetCardsActionType | SetCardsPerPageActionType | SetCardActionType;
