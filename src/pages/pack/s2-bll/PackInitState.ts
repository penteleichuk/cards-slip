import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";

export type PackInitStateType = GetPackRequestType & {
    user_id: string | undefined,
    cardPacks: CardPacksType[],
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    page: number
    pageCount: number
    search?: string | null
    packName?: string
    sortPacks?: string
    minCards?: number,
    maxCards?: number,
    totalCards: number,
}

export const PackInitState: PackInitStateType = {
    user_id: undefined,
    cardPacks: [],
    cardPacksTotalCount: 10,        // count packs
    minCardsCount: 0,
    maxCardsCount: 500,
    page: 1,                        // pagination
    pageCount: 6,                   // count element ui
    search: null,
    packName: '',
    sortPacks: '0updated',
    minCards: 0,
    maxCards: 1,
    totalCards: 6,
}
