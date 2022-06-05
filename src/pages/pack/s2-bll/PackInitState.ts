import {GetPacksResponse} from "../s3-dal/PackApi";

export type PackStateType = GetPacksResponse;

export const PackInitState: PackStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 40
}