import {CardPacksType} from "../s3-dal/PackApi";

// Actions type
type GetCardsACType = ReturnType<typeof getPacksCardAC>;
type SetCardTotalCountACType = ReturnType<typeof setCardTotalCountAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetCardPerPageACType = ReturnType<typeof setCardPerPageAC>;
type SetCartsSortACType = ReturnType<typeof setCardsSortAC>;
type SetSortParamsACType = ReturnType<typeof setSortParamsAC>;
type SetMinMaxCardsActionType = ReturnType<typeof setMinMaxCards>;
type SetInitActionType = ReturnType<typeof setInitCards>;
type SetIsMyCardsPack = ReturnType<typeof setIsMyCardsPack>
type SetActiveSortPageActionType = ReturnType<typeof setActiveSortPageAC>
type RemovePackActionType = ReturnType<typeof removePackAC>
type UpdatePackActionType = ReturnType<typeof updatePackAC>

// Actions creator
export const getPacksCardAC = (cardsPack: CardPacksType[]) => ({type: 'GET-PACK-CARDS', cardsPack} as const)
export const setCardTotalCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const setCurrentPageAC = (currenPage: number) => ({type: 'SET-CURRENT-PAGE', currenPage} as const)
export const setCardPerPageAC = (totalCards: number) => ({type: 'SET-CARDS-PER-PAGE', totalCards} as const)
export const setIsMyCardsPack = (isMyCardsPack: boolean) => ({type: 'SET-IS-MY-CARDS-PACK', isMyCardsPack} as const)
export const setActiveSortPageAC = (activeSortPage: string) => ({type: 'SET-ACTIVE-SORT-PAGE', activeSortPage} as const)
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
export const removePackAC = (packId: string) => ({type: 'REMOVE-PACK', packId} as const)
export const updatePackAC = (packId: string, newPackName: string) => ({ type: 'UPDATE-PACK', packId, newPackName} as const)

// All types
export type PackActionsType =
    GetCardsACType
    | SetCardTotalCountACType
    | SetCurrentPageACType
    | SetCardPerPageACType
    | SetCartsSortACType
    | SetSortParamsACType
    | SetMinMaxCardsActionType
    | SetInitActionType
    | SetIsMyCardsPack
    | SetActiveSortPageActionType
    | RemovePackActionType
    | UpdatePackActionType;