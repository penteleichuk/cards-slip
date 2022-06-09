import {AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {getPacksCardAC, setCardTotalCountAC, setMinMaxCards,} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

export const getPacksTC = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const {minCardsCount, maxCardsCount, ...res} = await PackApi.getPacks(params)
        dispatch(getPacksCardAC(res.cardPacks))
        dispatch(setCardTotalCountAC(res.cardPacksTotalCount))
        dispatch(setMinMaxCards({minCardsCount, maxCardsCount}))
        dispatch(setAppStatusAC('idle'))
    } catch (err) {
        console.log(err)
    }
}