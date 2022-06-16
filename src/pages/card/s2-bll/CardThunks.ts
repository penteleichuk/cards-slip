import {CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {removeCardAC, setCards, updateCardAC} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";
import {getPacksTC} from "../../pack/s2-bll/PackThunks";

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

export const removeCardTC = (cardId: string): AppThunk => async (dispatch: Dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const {packUserId} = getState().card
    const removeCardParams = {id: cardId}
    const getCardParams = {cardsPack_id:packUserId} //what is this?

    try {
        await CardApi.deleteCard(removeCardParams)
        dispatch(removeCardAC(cardId))
        //@ts-ignore
        dispatch(fetchCards(getCardParams))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}


export const updateCardTC = (cardId: string, newCardQuestion: string, newCardAnswer: string): AppThunk =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const card = getState().card.cards.find(c => c._id === cardId)
        const updateCardParams = card ? {...card, question: newCardQuestion, answer: newCardAnswer} : null

        const {page, pageCount} = getState().pack
        const user_id = getState().login._id
        const getPacksParams = {page, user_id, pageCount}

        if(updateCardParams) {
            try {
                await CardApi.updateCard({card: updateCardParams})
                dispatch(updateCardAC(cardId, newCardQuestion, newCardAnswer))
                //@ts-ignore
                dispatch(getPacksTC(getPacksParams))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            }
        }
    }