import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {ActionType, AppStoreType} from "../pages/app/s2-bll/store";

export type TypedDispatch = ThunkDispatch<AppStoreType, any, ActionType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();