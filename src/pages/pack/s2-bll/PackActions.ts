import {CardPacksType, GetPacksResponse} from "../s3-dal/PackApi";

// Actions creator
export const setPack = (payload: { cardsPack: CardPacksType }) => ({type: 'PACK/SET-PACK', payload} as const);
export const setPacks = (payload: GetPacksResponse) => ({type: 'PACK/SET-PACKS', payload} as const);
export const setPacksSort = (payload: { sortPacks: string }) => ({type: 'PACK/SET-SORT', payload} as const);
export const setPacksPagination = (payload: { page: number }) => ({type: 'PACK/SET-PAGINATION', payload} as const);
export const setPacksPerPage = (payload: { pageCount: number }) => ({type: 'PACK/SET-PER-PAGE', payload} as const);
export const setPacksMinMax = (payload: { minCardsCount: number, maxCardsCount: number }) => ({type: 'PACK/SET-MIN-MAX', payload} as const);
export const setPacksUserId = (payload: { user_id: string | undefined }) => ({type: 'PACK/SET-USER-ID', payload} as const);

// Actions type
type SetPackActionType = ReturnType<typeof setPack>
type SetPacksSortActionType = ReturnType<typeof setPacksSort>;
type SetPacksPaginationActionType = ReturnType<typeof setPacksPagination>;
type SetPacksPerPageActionType = ReturnType<typeof setPacksPerPage>;
type SetPacksMinMaxActionType = ReturnType<typeof setPacksMinMax>;
type SetPacksActionType = ReturnType<typeof setPacks>;
type SetPacksUserIdActionType = ReturnType<typeof setPacksUserId>;

// All types
export type PackActionsType =
    | SetPackActionType
    | SetPacksPaginationActionType
    | SetPacksSortActionType
    | SetPacksPerPageActionType
    | SetPacksMinMaxActionType
    | SetPacksActionType
    | SetPacksUserIdActionType;
