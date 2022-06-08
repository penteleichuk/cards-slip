import {CardPacksType} from "../s3-dal/PackApi";

export type PackInitStateType = {
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    sortType: string
    sortCode: string
}

export const PackInitState: PackInitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 40,
    sortType: '',
    sortCode: ''
}