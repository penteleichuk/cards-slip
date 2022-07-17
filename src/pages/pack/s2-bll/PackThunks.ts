import {AppStoreType, AppThunk} from "../../app/s2-bll/store";
import {GetPackRequestType, PackApi} from "../s3-dal/PackApi";
import {setPack, setPacks} from "./PackActions";
import {setAppStatusAC} from "../../app/s2-bll/actions";

// Get all packs
export const fetchGetPacks = (params: GetPackRequestType): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));

    const {user_id, page, pageCount, sortPacks, min, max, totalCards, packName} = getState().pack;
    const advancedOptions = {user_id, page, pageCount, sortPacks, min, max, totalCards, packName,  ...params};

    try {
        const res = await PackApi.getPacks(advancedOptions);
        dispatch(setPacks({...res}));
    } catch (err) {
        console.log(err, "error fetch get cards")
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const fetchRemovePack = (packId: string): AppThunk => async (dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const {page, pageCount} = getState().pack
    const user_id = getState().login._id
    const params = {page, user_id, pageCount}

    try {
        await PackApi.deletePack({id: packId});
        dispatch(fetchGetPacks(params));
    } catch (err) {
        console.log(err, "error fetch remove cards");
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}

export const fetchUpdatePack = (packId: string, newPackName: string): AppThunk => async (dispatch, getState: () => AppStoreType) => {
    dispatch(setAppStatusAC('loading'));

    const cardPack = getState().pack.cardPacks.find(p => p._id === packId)
    const updatePackParams = cardPack ? {...cardPack, name: newPackName} : null

    if (updatePackParams) {
        try {
            await PackApi.updatePack({cardsPack: updatePackParams})
        } catch (err) {
            console.log(err, "error fetch update cards");
        } finally {
            dispatch(setAppStatusAC('succeeded'));
        }
    }
}

export const fetchCreatePack = (cardsPack: { name?: string, deckCover?: string, private?: boolean }): AppThunk => async dispatch => {
    try {
        const res = await PackApi.addPack(cardsPack);
        dispatch(setPack(res.data.newCardsPack));
    } catch (err) {
        console.log(err, "error fetch create cards");
    }
}
