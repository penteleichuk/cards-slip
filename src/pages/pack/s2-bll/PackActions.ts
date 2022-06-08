import {CardPacksType} from "../s3-dal/PackApi";

export type PackActionsType =
    | ReturnType<typeof getPacksCardAC>
    | ReturnType<typeof setCardTotalCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setCardsSortAC>
    | ReturnType<typeof setSortParamsAC>

export const getPacksCardAC = (cardsPack: CardPacksType[]) => ({type: 'GET-PACK-CARDS', cardsPack} as const)
export const setCardTotalCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const setCurrentPageAC = (currenPage: number) => ({type: 'SET-CURRENT-PAGE', currenPage} as const)
export const setCardsSortAC = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS-SORT', cardPacks} as const)
export const setSortParamsAC = (sortCode: string, sortType: string) => ({
    type: 'SET-SORT-PARAMS',
    sortCode,
    sortType
} as const)