import {CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {removeCardAC, setCards, updateCardAC} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

export const fetchCards = (params: GetCardRequestType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await CardApi.getCards(params);
        dispatch(setCards({cards: res.cards}));
    } catch (error: unknown) {
        console.log(error);
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}

export const removeCardTC = (cardId: string, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));

    const removeCardParams = {id: cardId}
    const getCardParams = {cardsPack_id: packId}

    try {
        await CardApi.deleteCard(removeCardParams)
        dispatch(removeCardAC(cardId))
        dispatch(fetchCards(getCardParams))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}

export const updateCardTC = (cardId: string, packId: string, newCardQuestion: string, newCardAnswer: string): AppThunk =>
    async (dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const card = getState().card.cards.find(c => c._id === cardId)
        const updateCardParams = card ? {...card, question: newCardQuestion, answer: newCardAnswer} : null

        if(updateCardParams) {
            try {
                await CardApi.updateCard({card: updateCardParams})
                dispatch(updateCardAC(cardId, newCardQuestion, newCardAnswer))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            } finally {
                dispatch(setAppStatusAC('succeeded'))
            }
        }
    }