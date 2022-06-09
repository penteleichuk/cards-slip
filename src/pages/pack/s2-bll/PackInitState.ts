import {GetPacksResponse} from "../s3-dal/PackApi";

export type PackStateType = GetPacksResponse & {
    isInit: 'idle' | 'pre' | 'init'
    isMyCardsPack: boolean | null
    search?: string | null
    packName?: string
    sortPacks?: string
    minCards?: number,
    maxCards?: number,
};

export const PackInitState: PackStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 500,
    page: 1,
    pageCount: 40,
    isInit: 'idle',
    isMyCardsPack: null,
    search: null,
    packName: '0updated',
    sortPacks: '0updated',
    minCards: 0,
    maxCards: 1,
}