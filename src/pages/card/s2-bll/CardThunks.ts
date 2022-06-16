import {CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {removeCardAC, setCards} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";

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
