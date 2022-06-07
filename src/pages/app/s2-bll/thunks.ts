import {AppThunk} from "./store";
import {setLoggedInAC} from "../../auth/login/s2-bll/LoginActions";
import {profileApi} from "../../profile/s3-dal/ProfileApi";
import {setAppIsInitializedAC, setAppStatusAC} from "./actions";
import {profileMeAC} from "../../profile/s2-bll/ProfileActions";

export const initializedApp = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await profileApi.profileMe();
        dispatch(profileMeAC(res.data))
        dispatch(setLoggedInAC(true));

    } catch (error) {
        console.log(error)
    }finally {
        dispatch(setAppIsInitializedAC(true));
        dispatch(setAppStatusAC('succeeded'));
    }
}