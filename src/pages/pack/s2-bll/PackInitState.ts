import {GetPacksResponse} from "../s3-dal/PackApi";

export type PackStateType = GetPacksResponse;

export const PackInitState: PackStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}