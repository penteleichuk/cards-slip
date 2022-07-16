import {CardPacksType, GetPacksResponse} from "../s3-dal/PackApi";

// Actions creator
export const setCurrentPageAC = (payload: {currenPage: number}) => ({type: 'SET-CURRENT-PAGE', payload} as const)
export const setCardPerPageAC = (payload: {totalCards: number}) => ({type: 'SET-CARDS-PER-PAGE', payload} as const)
export const setIsMyCardsPack = (isMyCardsPack: boolean) => ({type: 'SET-IS-MY-CARDS-PACK', isMyCardsPack} as const)
export const setActiveSortPage = (activeSortPage: string) => ({type: 'SET-ACTIVE-SORT-PAGE', activeSortPage} as const)
export const setCardsSortAC = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS-SORT', cardPacks} as const)
export const setSortParamsAC = (sortCode: string, sortType: string) => ({
    type: 'SET-SORT-PARAMS',
    sortCode,
    sortType
} as const)
export const addPackAC = (cardsPack: CardPacksType) => ({
    type: 'ADD-NEW-PACK',
    cardsPack
} as const)

export const setPacks = (payload: GetPacksResponse) => ({type: 'SET-PACKS', payload} as const);
export const setInitCards = (payload: { isInit: 'idle' | 'pre' | 'init' }) => ({type: 'SET-IS-INIT', payload} as const);
export const setMinMaxCards = (payload: { minCardsCount: number, maxCardsCount: number }) => ({
    type: 'SET-MIN-MAX-CARDS',
    payload
} as const);

//
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetCardPerPageACType = ReturnType<typeof setCardPerPageAC>;
type SetCartsSortACType = ReturnType<typeof setCardsSortAC>;
type SetSortParamsACType = ReturnType<typeof setSortParamsAC>;
type SetIsMyCardsPack = ReturnType<typeof setIsMyCardsPack>
type SetActiveSortPageActionType = ReturnType<typeof setActiveSortPage>
type AddNewPackType = ReturnType<typeof addPackAC>
type SetMinMaxCardsActionType = ReturnType<typeof setMinMaxCards>;
type SetInitActionType = ReturnType<typeof setInitCards>;
type SetPacksActionType = ReturnType<typeof setPacks>;

// All types
export type PackActionsType =
    | SetCurrentPageACType
    | SetCardPerPageACType
    | SetCartsSortACType
    | SetSortParamsACType
    | SetMinMaxCardsActionType
    | SetInitActionType
    | SetIsMyCardsPack
    | SetActiveSortPageActionType
    | AddNewPackType
    | SetPacksActionType;
