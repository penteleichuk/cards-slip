import {AddCardRequestType, CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {setCard, setCards} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

// Get all cards
export const fetchCards = (params: GetCardRequestType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await CardApi.getCards(params);
        if(res) {
            dispatch(setCards({cards: res.cards}));
        }
    } catch (error: unknown) {
        console.error(error, "Map load error");
    } finally {
        dispatch(setAppStatusAC('idle'));
    }
}

// Add single card
export const fetchAddCard = (card: AddCardRequestType, packId: string): AppThunk => async dispatch => {
    try {
        const res = await CardApi.addCard(card)
        if(res.data) {
            dispatch(setCard({card: res.data}))
            dispatch(fetchCards({cardsPack_id: packId}))
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
        dispatch(fetchCards(getCardParams))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}

// Update card
export const fetchUpdateCard = (cardId: string, packId: string, newCardQuestion: string, newCardAnswer: string): AppThunk =>
    async (dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const card = getState().card.cards.find(c => c._id === cardId)
        const updateCardParams = card ? {...card, question: newCardQuestion, answer: newCardAnswer} : null

        const getCardParams = {cardsPack_id: packId}

        if(updateCardParams) {
            try {
                await CardApi.updateCard({card: updateCardParams})
                dispatch(fetchCards(getCardParams))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            }
        }
    }
