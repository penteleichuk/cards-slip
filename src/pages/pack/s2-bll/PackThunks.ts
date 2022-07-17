import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {
    setPacksSortAC,
    setSortParamsAC,
    getPacksCardAC,
    setCardTotalCountAC,
    setMinMaxCards,
    setIsMyCardsPack,
    setActiveSortPage,
    addPackAC,
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
        myCardsPackId ? dispatch(setActiveSortPage('Profile')) : dispatch(setActiveSortPage('Packs'))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const addPackTC = (cardsPack: { name?: string, deckCover?: string, private?: boolean }): AppThunk => async (dispatch, getState) => {

    const {page, pageCount} = getState().pack

    try {
        await PackApi.addPack(cardsPack)
        dispatch(addPackAC(cardsPack))
        dispatch(getPacksTC({page, pageCount}))
    } catch (err) {
        console.log(err)
    }
}

export const removePackTC = (packId: string): AppThunk => async (dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const {page, pageCount} = getState().pack
    const user_id = getState().login._id
    const params = {page, user_id, pageCount}

    try {
        await PackApi.deletePack({id: packId})
        dispatch(getPacksTC(params))
    } catch (err) {
        console.log(err)
        dispatch(setAppStatusAC('failed'))
    }
}

export const updatePackTC = (packId: string, newPackName: string): AppThunk =>
    async (dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const cardPack = getState().pack.cardPacks.find(p => p._id === packId)
        const updatePackParams = cardPack ? {...cardPack, name: newPackName} : null

        const {page, pageCount} = getState().pack
        const user_id = getState().login._id
        const getPackParams = {page, user_id, pageCount}

        if(updatePackParams) {
            try {
                await PackApi.updatePack({cardsPack: updatePackParams})
                dispatch(getPacksTC(getPackParams))
            } catch (err) {
                console.log(err)
                dispatch(setAppStatusAC('failed'))
            }
        }
}

export const setPacksSortTC = (sortParams: SortPacksParamsType) =>
    async (dispatch: Dispatch, getState: () => AppStoreType) => {
        dispatch(setAppStatusAC('loading'));

        const {page, pageCount, isMyCardsPack} = getState().pack
        const user_id = getState().login._id

        const params = isMyCardsPack
            ? {page, user_id, pageCount, sortPacks: sortParams.sortCode + sortParams.sortType}
            : {page, pageCount, sortPacks: sortParams.sortCode + sortParams.sortType}

        try {
            const res = await PackApi.getPacks(params)
            dispatch(setPacksSortAC(res.cardPacks))
            dispatch(setSortParamsAC({sortCode: sortParams.sortCode, sortType: sortParams.sortType}))
            dispatch(setAppStatusAC('idle'))
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export type SortPacksParamsType = {
    sortType: string,
    sortCode: string,
    user_id?: string | undefined
}