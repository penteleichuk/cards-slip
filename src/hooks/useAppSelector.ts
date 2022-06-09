import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStoreType} from "../pages/app/s2-bll/store";

export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector