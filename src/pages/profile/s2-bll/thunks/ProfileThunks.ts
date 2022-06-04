import {profileApi} from "../../s3-dal/ProfileApi";
import {settingsProfileAC} from "../ProfileActions";
import {AppThunk} from "../../../app/s2-bll/store";
import {setAppIsInitializedAC, setAppStatusAC} from "../../../app/s2-bll/actions";


export const settingProfile = (name:string, ava?: string) : AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await profileApi.settings(name, ava);
        dispatch(settingsProfileAC(name, ava))
        dispatch(setAppStatusAC('succeeded'));
    } catch (error){
        dispatch(setAppStatusAC('succeeded'));
    }
    dispatch(setAppIsInitializedAC(true));
}