import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {setPack, setPacks} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

export const getPacksTC = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));

    const {page, pageCount} = getState().pack;
    const userId = params.user_id || undefined;

    const parametersFormation = {
        page,
        pageCount,
        ...params
    };

    try {
        const res = await PackApi.getPacks(parametersFormation);
        if (res) {
            dispatch(setPacks({...res}));
        }

    } catch (err) {
        console.log(err, "error fetch get cards")
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
    } finally {
        dispatch(setAppStatusAC('succeeded'))
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
            console.log(err);
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    }
}

export const addNewPackTC = (cardsPack: { name?: string, deckCover?: string, private?: boolean }): AppThunk => async dispatch => {
    try {
        const res = await PackApi.addPack(cardsPack);
        dispatch(setPack(res.data.newCardsPack));

        dispatch(getPacksTC({}));
    } catch (err) {
        console.log(err, "error create pack");
    }
}
