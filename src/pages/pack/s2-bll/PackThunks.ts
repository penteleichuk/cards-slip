import {AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {getPacksCardAC, setCardTotalCountAC} from "./PackActions";

export const getPacksTC = (params: GetPackRequestType): AppThunk => async dispatch => {
    try {
        const res = await PackApi.getPacks(params)
        dispatch(getPacksCardAC(res.cardPacks))
        dispatch(setCardTotalCountAC(res.cardPacksTotalCount))
    } catch (err) {
        console.log(err)
    }
}