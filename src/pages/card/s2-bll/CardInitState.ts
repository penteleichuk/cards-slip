import {GetCardResponseType} from "../s3-dal/CardApi";

export type CardStateType = GetCardResponseType & {
    minCardsCount: number
    maxCardsCount: number
    search?: string | null
    cardName?: string
    sortCards?: string
    minCards?: number,
    maxCards?: number,
    totalCards: number,
};

export const cardInitState: CardStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: null,
    minCardsCount: 0,
    maxCardsCount: 500,
    search: null,
    cardName: '',
    sortCards: 'updated',
    minCards: 0,
    maxCards: 1,
    totalCards: 6,
}
