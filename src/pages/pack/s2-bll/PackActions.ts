import {CardPacksType, GetPacksResponse} from "../s3-dal/PackApi";

// Actions creator
export const setPackAC = (payload: {cardsPack: CardPacksType}) => ({type: 'SET-NEW-PACK', payload} as const);
export const setCurrentPageAC = (payload: {currenPage: number}) => ({type: 'SET-CURRENT-PAGE', payload} as const);
export const setCardPerPageAC = (payload: {totalCards: number}) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);
export const setIsMyCardsPack = (payload: {isMyCardsPack: boolean}) => ({type: 'SET-IS-MY-CARDS-PACK', payload} as const);
export const setActiveSortPage = (payload: {activeSortPage: string}) => ({type: 'SET-ACTIVE-SORT-PAGE', payload} as const);
export const setCardsSortAC = (payload: {cardPacks: CardPacksType[]}) => ({type: 'SET-CARDS-SORT', payload} as const);
export const setSortParamsAC = (payload: {sortCode: string, sortType: string}) => ({type: 'SET-SORT-PARAMS', payload} as const);
export const setPacks = (payload: GetPacksResponse) => ({type: 'SET-PACKS', payload} as const);
export const setInitCards = (payload: { isInit: 'idle' | 'pre' | 'init' }) => ({type: 'SET-IS-INIT', payload} as const);
export const setMinMaxCards = (payload: { minCardsCount: number, maxCardsCount: number }) => ({type: 'SET-MIN-MAX-CARDS', payload} as const);

// Actions type
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetCardPerPageACType = ReturnType<typeof setCardPerPageAC>;
type SetCartsSortACType = ReturnType<typeof setCardsSortAC>;
type SetSortParamsACType = ReturnType<typeof setSortParamsAC>;
type SetIsMyCardsPack = ReturnType<typeof setIsMyCardsPack>
type SetActiveSortPageActionType = ReturnType<typeof setActiveSortPage>
type SetNewPackType = ReturnType<typeof setPackAC>
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
    | SetNewPackType
    | SetPacksActionType;
