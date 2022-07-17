import {AddCardRequestType, CardType} from "../s3-dal/CardApi";
import {SortCardsType} from "./CardInitState";

// Actions creator
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);
export const addNewCard = (card: AddCardRequestType) => ({type: 'ADD-NEW-CARD', card} as const)
export const setCurrentCardPage = (payload: { page: number }) => ({type: 'SET-CURRENT-CARD-PAGE', payload} as const)
export const setCardsTotalCount = (payload: { cardsTotalCount: number }) => ({
    type: 'SET-CARDS-TOTAL-COUNT',
    payload
} as const)
export const setSortCardsParams = (payload: SortCardsType) => ({
    type: 'SET-SORT-CARDS-PARAMS',
    payload
} as const)

// Actions type
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type AddNewCardType = ReturnType<typeof addNewCard>
export type SetCurrentCardPageActionType = ReturnType<typeof setCurrentCardPage>
export type SetCardsTotalCountActionType = ReturnType<typeof setCardsTotalCount>
export type SetSortCardsParamsActionType = ReturnType<typeof setSortCardsParams>

// All types
export type CardActionsType =
    | SetCardsActionType
    | SetCardsPerPageActionType
    | AddNewCardType
    | SetCurrentCardPageActionType
    | SetCardsTotalCountActionType
    | SetSortCardsParamsActionType