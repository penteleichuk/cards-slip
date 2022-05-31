import {Dialog} from "../../../../components/Dialog/Dialog";
import SetPasswordImg from "../../../../assets/images/set_password.png";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import React, {useState} from "react";
import {passwordValidator} from "../../../../validations/validators";
import {useDispatch, useSelector} from "react-redux";
import {sendResetPassword} from "../s2-bll/thunks/SetPasswordThunks";
import {setErrorPassword, setStatusPassword} from "../s2-bll/SetPasswordActions";
import {AppStoreType} from "../../../app/s2-bll/store";
import {SetPasswordStateType} from "../s2-bll/SetPasswordInitState";
import {useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {RouteNames} from "../../../../constants/routes";

export const SetPasswordPage = (): JSX.Element => {
    const state = useSelector<AppStoreType, SetPasswordStateType>(state => state.password);

    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const dispatch = useDispatch<any>();
    const location = useLocation();

    React.useEffect(() => {
        if(location.pathname) {
            const getToken = location.pathname.split('/').reverse()[0];
            setToken(getToken);
        }
    }, []);

    const clickHandler = () => {
        if (!passwordValidator(password)) {
            dispatch(setErrorPassword({error: 'Invalid password'}));
            setPassword('');
        } else {
            dispatch(setErrorPassword({error: ''}));
            dispatch(sendResetPassword(password, token));
        }
    }

    if(state.status === 'success') {
        dispatch(setStatusPassword({status: 'idle'}))
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                <Dialog image={SetPasswordImg} title={'It-incubator'} subtitle={'Create new password'}>
                    <section>
                        <div className="dialog__inputs">
                            <div className="dialog__description">
                                Create new password and we will send you further instructions to email
                            </div>
                            <InputText
                                disabled={state.status === 'process'}
                                error={state.error}
                                name="password"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"/>
                            <div className="dialog__buttons">
                                <Button
                                    loading={state.status === 'process'}
                                    disabled={state.status === 'process'}
                                    onClick={clickHandler}>Create new password</Button>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </div>
        </section>
    </>
}