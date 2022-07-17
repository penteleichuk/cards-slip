import {AddCardRequestType, CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {addNewCard, setCards, setCardsTotalCount, setSortCardsParams} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";

export const getCards = (params: GetCardRequestType): AppThunk =>
    async (dispatch, getState) => {

        dispatch(setAppStatusAC('loading'));

        const {sortCode, sortType} = getState().card

        const processedParams = (sortCode !== '' && sortType !== '')
            ? {...params, sortCards: sortCode + sortType}
            : {...params}


        try {
            const {cards, cardsTotalCount} = await CardApi.getCards(processedParams);
            dispatch(setCards({cards}));
            dispatch(setCardsTotalCount({cardsTotalCount}))
        } catch (error: unknown) {
            console.log(error);
        } finally {
            dispatch(setAppStatusAC('idle'));
        }
    }

export const addCardTC = (card: AddCardRequestType, packId: string): AppThunk => async (dispatch, getState) => {

    const {page, pageCount} = getState().card

    try {
        await CardApi.addCard(card)
        dispatch(addNewCard(card))
        dispatch(getCards({cardsPack_id: packId, page, pageCount}))
    } catch (err) {
        console.log(err)
    }
}

export const removeCardTC = (cardId: string, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));

    const removeCardParams = {id: cardId}
    const getCardParams = {cardsPack_id: packId}

    try {
        await CardApi.deleteCard(removeCardParams)
        dispatch(getCards(getCardParams))
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

        const getCardParams = {cardsPack_id: packId}

        if (updateCardParams) {
            try {
                await CardApi.updateCard({card: updateCardParams})
                dispatch(getCards(getCardParams))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            }
        }
    }

export const setCardsSortTC = (sortParams: SortCardsParamsType) =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {

        dispatch(setAppStatusAC('loading'));

        const {page, pageCount} = getState().card

        const params = {
            page,
            pageCount,
            cardsPack_id: sortParams.cardsPack_id,
            sortCards: sortParams.sortCode + sortParams.sortType
        }

        try {
            const {cards} = await CardApi.getCards(params)
            dispatch(setSortCardsParams({sortCode: sortParams.sortCode, sortType: sortParams.sortType}))
            dispatch(setCards({cards}))
            dispatch(setAppStatusAC('idle'))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export type SortCardsParamsType = {
    cardsPack_id?: string | null,
    sortCode: string,
    sortType: string
}