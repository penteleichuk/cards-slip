import {CardPacksType, GetPacksResponse} from "../s3-dal/PackApi";

// Actions creator
export const setPack = (payload: {cardsPack: CardPacksType}) => ({type: 'SET-NEW-PACK', payload} as const);
export const setPacks = (payload: GetPacksResponse) => ({type: 'SET-PACKS', payload} as const);
export const setPacksSort = (payload: {sortPacks: string}) => ({type: 'SET-PACKS-SORT', payload} as const);
export const setPacksState = (payload: { isInit: 'idle' | 'pre' | 'init' }) => ({type: 'SET-IS-INIT', payload} as const);
export const setPacksPagination = (payload: {page: number}) => ({type: 'SET-CURRENT-PAGE', payload} as const);
export const setPacksPerPage = (payload: {totalCards: number}) => ({type: 'SET-CARDS-PER-PAGE', payload} as const);
export const setPacksMinMax = (payload: { minCardsCount: number, maxCardsCount: number }) => ({type: 'SET-MIN-MAX-CARDS', payload} as const);

// Actions type
type SetPackActionType = ReturnType<typeof setPack>
type SetPacksStateActionType = ReturnType<typeof setPacksState>;
type SetPacksSortActionType = ReturnType<typeof setPacksSort>;
type SetPacksPaginationActionType = ReturnType<typeof setPacksPagination>;
type SetPacksPerPageActionType = ReturnType<typeof setPacksPerPage>;
type SetPacksMinMaxActionType = ReturnType<typeof setPacksMinMax>;
type SetPacksActionType = ReturnType<typeof setPacks>;

// All types
export type PackActionsType =
    | SetPackActionType
    | SetPacksStateActionType
    | SetPacksPaginationActionType
    | SetPacksSortActionType
    | SetPacksPerPageActionType
    | SetPacksMinMaxActionType
    | SetPacksActionType;
