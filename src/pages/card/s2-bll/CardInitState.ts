import {CardType, GetCardResponseType} from "../s3-dal/CardApi";
import {StudyStageType} from "../../../enums/enums";

export type CardStateType = GetCardResponseType & {
    cardsPack_id?: string | undefined
    cardAnswer?: string
    search?: string | null
    sortCards?: string
    totalCards: number,
    studyStage: StudyStageType,
    actualStudyCard: CardType | null
};

export const cardInitState: CardStateType = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: null,
    cardsPack_id: undefined,
    cardAnswer: '',
    search: null,
    sortCards: '0updated',
    totalCards: 6,
    studyStage: StudyStageType.noActivity,
    actualStudyCard: null
}
