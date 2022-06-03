import React, {useState} from "react";
import {Dialog} from "../../Dialog/Dialog";
import {InputText} from "../../InputText/InputText";
import {Button} from "../../Button/Button";
import ForgotImg from "../../../assets/images/forgot_img.png";
import {RouteNames} from "../../../constants/routes";
import {Link} from "react-router-dom";
import {emailValidator} from "../../../validations/validators";
import {useSelector} from "react-redux";
import {sendRecoveryLink} from "../../../pages/auth/forgot/s2-bll/thunks/ForgotThunks";
import {AppStoreType} from "../../../pages/app/s2-bll/store";
import {setErrorForget} from "../../../pages/auth/forgot/s2-bll/ForgotActions";
import {ForgotStateType} from "../../../pages/auth/forgot/s2-bll/ForgotInitState";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

export const IdleForgotDialog = React.memo(() => {
    const state = useSelector<AppStoreType, ForgotStateType>(state => state.forgot);
    const [email, setEmail] = useState<string>('');

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        if (!emailValidator(email)) {
            dispatch(setErrorForget({error: 'Invalid Email Address'}));
        } else {
            dispatch(setErrorForget({error: ''}));
            dispatch(sendRecoveryLink(email));
        }
    }

    return <>
        <Dialog image={ForgotImg} title={'It-incubator'} subtitle={'Forgot your password?'}>
            <section style={{justifyContent: "space-evenly"}}>
                <div className="dialog__inputs">
                    <InputText disabled={state.status === 'process'}
                               error={state.error}
                               name="login"
                               onChangeText={setEmail}
                               value={email}
                               placeholder="Email"/>
                    <div className="dialog__buttons">
                        <Button
                            loading={state.status === 'process'}
                            disabled={state.status === 'process'}
                            onClick={clickHandler}>Send instructions</Button>
                    </div>
                    <div className="dialog__description">
                        Enter your email address and we will send you further instructions
                    </div>
                </div>
                <div className="dialog__footer">
                    <Link to={RouteNames.LOGIN}>I have an Account ?</Link>
                </div>
            </section>
        </Dialog>
    </>
});