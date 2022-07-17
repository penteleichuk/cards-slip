import {GetCardResponseType} from "../s3-dal/CardApi";

export type CardStateType = GetCardResponseType & SortCardsType

export const cardInitState: CardStateType = {
    cards: [],
    cardsTotalCount: 10,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 6,
    packUserId: '',
    sortType: '',
    sortCode: ''
}

export type SortCardsType = {
    sortType: string
    sortCode: string
}