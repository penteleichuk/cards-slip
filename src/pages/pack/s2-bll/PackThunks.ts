import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {setCardsSortAC, setSortParamsAC, getPacksCardAC, setCardTotalCountAC, setMinMaxCards} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";


export const getPacksTC = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    const pack = getState().pack

    const processedParams = (pack.sortCode !== '' && pack.sortType !== '')
        ? {...params, sortPacks: pack.sortCode + pack.sortType}
        : params

    try {
        const {minCardsCount, maxCardsCount, cardPacks, cardPacksTotalCount} = await PackApi.getPacks(processedParams)
        dispatch(setMinMaxCards({minCardsCount, maxCardsCount}))
        dispatch(setAppStatusAC('idle'))
        dispatch(getPacksCardAC(cardPacks))
        dispatch(setCardTotalCountAC(cardPacksTotalCount))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}


export const setCardsSortTC = (sortParams: SortParamsType) =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const state = getState().pack
        const params = {page: state.page, pageCount: state.pageCount, sortPacks: sortParams.code + sortParams.type}

        try {
            const res = await PackApi.getPacks(params)
            dispatch(setCardsSortAC(res.cardPacks))
            dispatch(setSortParamsAC(sortParams.code, sortParams.type))
            dispatch(setAppStatusAC('idle'))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    }

type SortParamsType = {
    type: string,
    code: string
}