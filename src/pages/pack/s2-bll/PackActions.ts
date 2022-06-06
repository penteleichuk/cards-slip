import {CardPacksType} from "../s3-dal/PackApi";

type GetCardsACType = ReturnType<typeof getPacksCardAC>;
type SetCardTotalCountACType = ReturnType<typeof setCardTotalCountAC>;
type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>;
type SetCardPerPageACType = ReturnType<typeof setCardPerPageAC>;

export type PackActionsType = GetCardsACType | SetCardTotalCountACType | SetCurrentPageACType | SetCardPerPageACType;

export const getPacksCardAC = (cardsPack: CardPacksType[]) => ({type: 'GET-PACK-CARDS', cardsPack} as const)
export const setCardTotalCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const setCurrentPageAC = (currenPage: number) => ({type: 'SET-CURRENT-PAGE', currenPage} as const)
export const setCardPerPageAC = (totalCards: number) => ({type: 'SET-CARDS-PER-PAGE', totalCards} as const)
