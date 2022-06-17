import {GetCardResponseType} from "../s3-dal/CardApi";

export type CardStateType = GetCardResponseType;

export const cardInitState: CardStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: null,
}