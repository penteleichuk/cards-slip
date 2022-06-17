import {profileApi} from "../../s3-dal/ProfileApi";
import {settingsProfileAC} from "../ProfileActions";
import {AppThunk} from "../../../app/s2-bll/store";
import {setAppStatusAC} from "../../../app/s2-bll/actions";


export const settingProfileTC = (name: string, ava?: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        dispatch(settingsProfileAC(name, ava));
        await profileApi.settings(name, ava);
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}