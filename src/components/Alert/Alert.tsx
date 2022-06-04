import React, {useEffect} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../pages/app/s2-bll/store";
import './Alert.scss';
import {setAppErrorAC} from "../../pages/app/s2-bll/actions";

export type AlertType = {
    message: string | null;
    style?: AlertStyleType;
};

export type AlertStyleType = 'primary' | 'danger';

export const Alert = React.memo(() => {
    const dispatch = useAppDispatch();
    const state = useSelector<AppStoreType, {error: string | null, style: AlertStyleType}>(state => state.app);

    const alertStatus = state.error !== null && state.error !== '';

    useEffect(() => {
        if (alertStatus) {
            const timeout = setTimeout(() => {
                dispatch(setAppErrorAC(null))
            }, 3500);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [state.error, dispatch, alertStatus]);

    return <>
        {alertStatus &&
            <div className={`alert ${state.style}`}>
                {state.error}
            </div>
        }
    </>
});