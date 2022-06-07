import {CardApi, GetCardRequestType} from "../s3-dal/CardApi";
import {AppThunk} from "../../app/s2-bll/store";
import {setCards} from "./CardActions";

export const fetchCards = (params: GetCardRequestType):AppThunk => async dispatch => {
    try {
        const res = await CardApi.getCards(params);
        dispatch(setCards({cards: res.cards}));
    } catch (error: unknown) {
        console.log(error);
    }
}