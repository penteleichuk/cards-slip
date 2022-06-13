import {AddCardRequestType, CardType} from "../s3-dal/CardApi";

// Actions creator
export const setCards = (payload: { cards: CardType[] }) => ({type: 'SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: {pageCount: number}) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);
export const addNewCard = (card: AddCardRequestType)=>({type: 'ADD-NEW-CARD', card}as const)

// Actions type
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type AddNewCardType = ReturnType<typeof addNewCard>

// All types
export type CardActionsType = SetCardsActionType | SetCardsPerPageActionType | AddNewCardType;