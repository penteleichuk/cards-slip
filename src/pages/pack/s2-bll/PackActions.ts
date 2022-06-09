import {CardPacksType} from "../s3-dal/PackApi";

type GetCardsACType = ReturnType<typeof getPacksCardAC>;
type SetCardTotalCountACType = ReturnType<typeof setCardTotalCountAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetCardPerPageACType = ReturnType<typeof setCardPerPageAC>;
type SetCartsSortACType = ReturnType<typeof setCardsSortAC>;
type SetSortParamsACType = ReturnType<typeof setSortParamsAC>;
type SetMinMaxCardsActionType = ReturnType<typeof setMinMaxCards>;
type SetInitActionType = ReturnType<typeof setInitCards>;

export type PackActionsType =
    GetCardsACType
    | SetCardTotalCountACType
    | SetCurrentPageACType
    | SetCardPerPageACType
    | SetCartsSortACType
    | SetSortParamsACType
    | SetMinMaxCardsActionType
    | SetInitActionType;

export const getPacksCardAC = (cardsPack: CardPacksType[]) => ({type: 'GET-PACK-CARDS', cardsPack} as const)
export const setCardTotalCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const setCurrentPageAC = (currenPage: number) => ({type: 'SET-CURRENT-PAGE', currenPage} as const)
export const setCardPerPageAC = (totalCards: number) => ({type: 'SET-CARDS-PER-PAGE', totalCards} as const)

export const setCardsSortAC = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS-SORT', cardPacks} as const)
export const setSortParamsAC = (sortCode: string, sortType: string) => ({
    type: 'SET-SORT-PARAMS',
    sortCode,
    sortType
} as const)
export const setMinMaxCards = (payload: { minCardsCount: number, maxCardsCount: number }) => ({
    type: 'SET-MIN-MAX-CARDS',
    payload
} as const);
export const setInitCards = (payload: { isInit: 'idle' | 'pre' | 'init' }) => ({type: 'SET-IS-INIT', payload} as const);