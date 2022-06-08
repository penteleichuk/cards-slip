import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {getPacksCardAC, setCardsSortAC, setCardTotalCountAC, setSortParamsAC} from "./PackActions";
import {Dispatch} from "redux";

export const getPacksTC = (params: GetPackRequestType): AppThunk =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {

    const pack = getState().pack

    const processedParams = (pack.sortCode != '' && pack.sortType != '')
        ? {...params, sortPacks: pack.sortCode + pack.sortType}
        : params

    try {
        const res = await PackApi.getPacks(processedParams)
        dispatch(getPacksCardAC(res.cardPacks))
        dispatch(setCardTotalCountAC(res.cardPacksTotalCount))
    } catch (err) {
        console.log(err)
    }
}


export const setCardsSortTC = (sortParams: SortParamsType) =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {

    const state = getState().pack
    const params = {page: state.page, pageCount: state.pageCount, sortPacks: sortParams.code + sortParams.type}

    try {
        const res = await PackApi.getPacks(params)
        dispatch(setCardsSortAC(res.cardPacks))
        dispatch(setSortParamsAC(sortParams.code, sortParams.type))
    } catch (e) {
        console.log(e)
    }
}

type SortParamsType = {
    type: string,
    code: string
}