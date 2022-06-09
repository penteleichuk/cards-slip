import {CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppThunk} from "../../app/s2-bll/store";
import {setCards} from "./CardActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

export const fetchCards = (params: GetCardRequestType):AppThunk => async dispatch => {
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
