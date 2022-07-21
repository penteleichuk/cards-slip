import {profileApi, RequestUpdateProfile} from "../../s3-dal/ProfileApi";
import {settingsProfileAC} from "../ProfileActions";
import {AppThunk} from "../../../app/s2-bll/store";
import {setAppStatusAC} from "../../../app/s2-bll/actions";


export const settingProfileTC = (params: RequestUpdateProfile): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        dispatch(settingsProfileAC({...params}));
        await profileApi.settings({...params});
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setAppStatusAC('succeeded'));
    }
}
