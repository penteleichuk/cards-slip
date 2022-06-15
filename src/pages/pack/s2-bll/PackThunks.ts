import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {
    setCardsSortAC,
    setSortParamsAC,
    getPacksCardAC,
    setCardTotalCountAC,
    setMinMaxCards,
    setIsMyCardsPack, setActiveSortPageAC, removePackAC
} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";


export const getPacksTC = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    const {sortCode, sortType} = getState().pack

    const processedParams = (sortCode !== '' && sortType !== '')
        ? {...params, sortPacks: sortCode + sortType}
        : params

    const myCardsPackId = params.user_id || null

    try {
        const {minCardsCount, maxCardsCount, cardPacks, cardPacksTotalCount} = await PackApi.getPacks(processedParams)
        dispatch(setMinMaxCards({minCardsCount, maxCardsCount}))
        dispatch(setAppStatusAC('idle'))
        dispatch(getPacksCardAC(cardPacks))
        dispatch(setCardTotalCountAC(cardPacksTotalCount))
        myCardsPackId ? dispatch(setIsMyCardsPack(true)) : dispatch(setIsMyCardsPack(false));
        myCardsPackId ? dispatch(setActiveSortPageAC('Profile')) : dispatch(setActiveSortPageAC('Packs'))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const setCardsSortTC = (sortParams: SortParamsType) =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const {page, pageCount, isMyCardsPack, user_id} = getState().pack

        const params = isMyCardsPack
            ? {page, user_id, pageCount, sortPacks: sortParams.code + sortParams.type}
            : {page, pageCount, sortPacks: sortParams.code + sortParams.type}

        try {
            const res = await PackApi.getPacks(params)
            dispatch(setCardsSortAC(res.cardPacks))
            dispatch(setSortParamsAC(sortParams.code, sortParams.type))
            dispatch(setAppStatusAC('idle'))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const removePackTC = (packId: string): AppThunk => async (dispatch: Dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const {page, pageCount} = getState().pack
    const user_id = getState().login._id
    const params = {page, user_id, pageCount}

    try {
        await PackApi.deletePack({id: packId})
        dispatch(removePackAC(packId))
        //@ts-ignore
        dispatch(getPacksTC(params))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}

type SortParamsType = {
    type: string,
    code: string,
    user_id?: string | undefined
}