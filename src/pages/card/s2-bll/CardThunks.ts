import {AddCardRequestType, CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {setActualStudyCard, setCard, setCardGrade, setCards, setStudyStage} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {StudyStageType} from "../../../enums/enums";
import {getStudyCard} from "../../../helpers/randomizer";


// Get all cards
export const fetchGetCards = (params: GetCardRequestType, studyStage?: StudyStageType): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'));
        debugger

        const {cardsPack_id, cardAnswer, sortCards, pageCount, page} = getState().card;
        const advancedOptions = {cardsPack_id, cardAnswer, sortCards, pageCount, page, ...params};

        try {
            const res = await CardApi.getCards(advancedOptions);
            dispatch(setCards({...res}));

            if(studyStage) {
                dispatch(setStudyStage({studyStage}));
                dispatch(setActualStudyCard({actualStudyCard: getStudyCard(res.cards)}));
            }

        } catch (error: unknown) {
            console.error(error, "Map load error");
        } finally {
            dispatch(setAppStatusAC('idle'));
        }
    }

// Add single card
export const fetchCreateCard = (card: AddCardRequestType, packId: string): AppThunk => async dispatch => {
    try {
        const res = await CardApi.addCard(card)
        if (res.data) {
            dispatch(setCard({card: res.data}))
            dispatch(fetchGetCards({cardsPack_id: packId}))
        }
    } catch (err) {
        console.log(err)
    }
}

// Remove card
export const fetchRemoveCard = (cardId: string, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));

    const removeCardParams = {id: cardId}
    const getCardParams = {cardsPack_id: packId}

    try {
        await CardApi.deleteCard(removeCardParams)
        dispatch(fetchGetCards(getCardParams))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}

// Update card
export const fetchUpdateCard = (cardId: string, packId: string, newCardQuestion: string, newCardAnswer: string): AppThunk =>
    async (dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const card = getState().card.cards.find(c => c._id === cardId);
        const updateCardParams = card ? {...card, question: newCardQuestion, answer: newCardAnswer} : null

        const getCardParams = {cardsPack_id: packId}

        if (updateCardParams) {
            try {
                await CardApi.updateCard({card: updateCardParams})
                dispatch(fetchGetCards(getCardParams))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            }
        }
    }

export const fetchUpdateCardGrade = (cardId: string, newGrade: number): AppThunk =>
    async (dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const card = getState().card.cards.find(c => c._id === cardId);
        const updateCardGradeParams = card ? {...card, grade: newGrade} : null;

        if (updateCardGradeParams) {
            try {
                await CardApi.updateCard({card: updateCardGradeParams});
                dispatch(setCardGrade({card: updateCardGradeParams}));
                dispatch(setStudyStage({studyStage: StudyStageType.question}));
                dispatch(setAppStatusAC('succeeded'));
            } catch (err) {
                console.log(err);
                dispatch(setAppStatusAC('failed'));
            }
        }
    }
