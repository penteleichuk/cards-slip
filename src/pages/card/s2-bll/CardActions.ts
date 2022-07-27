import {CardType, GetCardResponseType} from "../s3-dal/CardApi";
import {StudyStageType} from "../../../enums/enums";

// Actions creator
export const setCard = (payload: { card: CardType }) => ({type: 'CARD/SET-CARD', payload} as const);
export const setCards = (payload: GetCardResponseType) => ({type: 'CARD/SET-CARDS', payload} as const);
export const setCardsPerPage = (payload: { pageCount: number }) => ({type: 'CARD/SET-PER-PAGE', payload} as const);
export const setCardsPagination = (payload: { page: number }) => ({type: 'CARD/SET-PAGINATION', payload} as const);
export const setCardsSort = (payload: { sortCards: string }) => ({type: 'CARD/SET-SORT', payload} as const);
export const setCardsReset = (payload: {
    cardAnswer: string | undefined,
    cardsPack_id: string | undefined,
    sortCards: string | undefined,
    pageCount: number,
    page: number,
}) => ({type: 'CARD/SET-RESET', payload} as const);
export const setStudyStage = (payload: { studyStage: StudyStageType }) => ({
    type: 'CARD/SET-STUDY-STAGE',
    payload
} as const);
export const setCardGrade = (payload: {card: CardType} ) => ({
    type: 'CARD/SET-CARD-GRADE',
    payload
} as const);
export const setActualStudyCard = (payload: {actualStudyCard: CardType}) => ({
    type: 'CARD/SET-ACTUAL-STUDY-CARD',
    payload
} as const);

// Actions type
export type SetCardActionType = ReturnType<typeof setCard>
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsPerPageActionType = ReturnType<typeof setCardsPerPage>
export type SetCardsResetActionType = ReturnType<typeof setCardsReset>
export type SetCardsPaginationActionType = ReturnType<typeof setCardsPagination>
export type SetCardsSortActionType = ReturnType<typeof setCardsSort>
export type SetStudyStageActionType = ReturnType<typeof setStudyStage>
export type SetCardGradeActionType = ReturnType<typeof setCardGrade>
export type SetActualStudyCard = ReturnType<typeof setActualStudyCard>

// All types
export type CardActionsType =
    SetCardsActionType
    | SetCardsPerPageActionType
    | SetCardActionType
    | SetCardsResetActionType
    | SetCardsPaginationActionType
    | SetCardsSortActionType
    | SetStudyStageActionType
    | SetCardGradeActionType
    | SetActualStudyCard;
