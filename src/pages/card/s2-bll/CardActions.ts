import {CardType, GetCardResponseType} from "../s3-dal/CardApi";

// Actions creator
export const setCard = (payload: { card: CardType }) => ({type: 'CARD/SET-CARD', payload} as const);
export const setCards = (payload: GetCardResponseType) => ({type: 'CARD/SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'CARD/SET-PER-PAGE', payload} as const);
export const setCardsPagination = (payload: { page: number }) => ({type: 'CARD/SET-PAGINATION', payload} as const);
export const setCardsReset = (payload: {
    cardAnswer: string | undefined,
    cardsPack_id: string | undefined,
    sortCards: string | undefined,
    pageCount: number,
    page: number,
}) => ({type: 'CARD/SET-RESET', payload} as const);

// Actions type
export type SetCardActionType = ReturnType<typeof setCard>
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type SetCardsResetActionType = ReturnType<typeof setCardsReset>
export type SetCardsPaginationActionType = ReturnType<typeof setCardsPagination>

// All types
export type CardActionsType =
    SetCardsActionType
    | SetCardsPerPageActionType
    | SetCardActionType
    | SetCardsResetActionType
    | SetCardsPaginationActionType;
