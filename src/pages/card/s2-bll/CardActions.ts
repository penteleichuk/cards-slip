import {CardType} from "../s3-dal/CardApi";

// Actions type
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type RemoveCardActionType = ReturnType<typeof removeCardAC>
export type UpdateCardActionType = ReturnType<typeof updateCardAC>

// Actions creator
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const)
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'SET-CARDS-PER-PAGE', payload} as const)
export const removeCardAC = (cardId: string) => ({type: 'REMOVE-CARD', cardId} as const)
export const updateCardAC = (cardId: string, newCardQuestion: string, newCardAnswer: string) => ({
    type: 'UPDATE-CARD',
    cardId,
    newCardQuestion,
    newCardAnswer
} as const)

// All types
export type CardActionsType =
    | SetCardsActionType
    | SetCardsPerPageActionType
    | RemoveCardActionType
    | UpdateCardActionType;
