import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {
    setCardsSortAC,
    setSortParamsAC,
    setIsMyCardsPack,
    setActiveSortPage,
    setPackAC, setPacks,
} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";
import {Dispatch} from "redux";

type SortParamsType = {
    type: string,
    code: string,
    user_id?: string | undefined
}

export const getPacksTC = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));

    const {sortCode, sortType, page, pageCount} = getState().pack;
    const userId = params.user_id || undefined;

    const parametersFormation = {
        sortPacks: sortCode + sortType,
        page,
        pageCount,
        ...params
    };

    try {
        const res = await PackApi.getPacks(parametersFormation);
        if (res) {
            dispatch(setPacks({...res}));
            dispatch(setIsMyCardsPack({isMyCardsPack: !!userId}));
            dispatch(setActiveSortPage({activeSortPage: `${userId ? 'Profile' : 'Packs'}`}));
        }

    } catch (err) {
        console.log(err, "error fetch get cards")
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const setCardsSortTC = (sortParams: SortParamsType) => async (dispatch: Dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const {page, pageCount, isMyCardsPack} = getState().pack
    const user_id = getState().login._id

    const params = isMyCardsPack
        ? {page, user_id, pageCount, sortPacks: sortParams.code + sortParams.type}
        : {page, pageCount, sortPacks: sortParams.code + sortParams.type}

    try {
        const res = await PackApi.getPacks(params)
        if (res) {
            dispatch(setCardsSortAC({cardPacks: res.cardPacks}));
            dispatch(setSortParamsAC({sortCode: sortParams.code, sortType: sortParams.type}));
        }
        dispatch(setAppStatusAC('idle'))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
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

export const updatePackTC = (packId: string, newPackName: string): AppThunk => async (dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const cardPack = getState().pack.cardPacks.find(p => p._id === packId)
    const updatePackParams = cardPack ? {...cardPack, name: newPackName} : null

    const {page, pageCount} = getState().pack
    const user_id = getState().login._id
    const getPackParams = {page, user_id, pageCount}

    if (updatePackParams) {
        try {
            await PackApi.updatePack({cardsPack: updatePackParams})
            dispatch(getPacksTC(getPackParams))
        } catch (err) {
            console.log(err)
            dispatch(setAppStatusAC('failed'))
        }
    }
}

export const addNewPackTC = (cardsPack: { name?: string, deckCover?: string, private?: boolean }): AppThunk => async dispatch => {
    try {
        const res = await PackApi.addPack(cardsPack);
        dispatch(setPackAC(res.data.newCardsPack));

        dispatch(getPacksTC({}));
    } catch (err) {
        console.log(err, "error create pack");
    }
}
