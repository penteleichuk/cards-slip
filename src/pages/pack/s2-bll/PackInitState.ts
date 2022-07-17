import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";

// export type PackStateType = GetPacksResponse & {
//     isInit: 'idle' | 'pre' | 'init'
//     isMyCardsPack: boolean | null
//     search?: string | null
//     packName?: string
//     sortPacks?: string
//     minCards?: number,
//     maxCards?: number,
// };

export type PackInitStateType = GetPackRequestType & {
    isInit: 'idle' | 'pre' | 'init'
    isMyCardsPack: boolean | null
    search?: string | null
    packName?: string
    sortPacks?: string
    minCards?: number,
    maxCards?: number,
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    activeSortPage: string
    sortType: string
    sortCode: string
    _id: string | null //? del
}

export const PackInitState: PackInitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    minCardsCount: 0,
    maxCardsCount: 500,
    page: 1,
    pageCount: 6,
    activeSortPage: '',
    sortType: '',
    sortCode: '',
    isInit: 'idle',
    isMyCardsPack: null,
    search: null,
    packName: '0updated',
    sortPacks: '0updated',
    minCards: 0,
    maxCards: 1,
    user_id: undefined,
    _id: null //? del
}