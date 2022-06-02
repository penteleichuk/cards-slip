import {InputText} from "../../../../components/InputText/InputText";
import {Checkbox} from "../../../../components/Checkbox/Checkbox";
import {Button} from "../../../../components/Button/Button";
import {Link} from "react-router-dom";
import {RouteNames} from "../../../../constants/routes";
import './Login.css'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../s2-bll/thunks/LoginThunks";
import {useState} from "react";
import {ActionType, AppStoreType} from "../../../app/s2-bll/store";
import {setAppErrorAC} from "../../../app/s2-bll/AppReducer";
import {ThunkDispatch} from "redux-thunk";
import {LoginParamsType} from "../s3-dal/LoginApi";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import LoginImg from "../../../../assets/images/login.png";
import {Dialog, DialogLinkType} from "../../../../components/Dialog/Dialog";

export const LoginPage = (): JSX.Element => {
    const links: DialogLinkType[] = [
        {name: 'Sing Up', link: RouteNames.REGISTRATION},
        {name: 'Forgot Password', link: RouteNames.FORGOT}
    ];
    const initialState: LoginParamsType = {
        email: '',
        password: '',
        rememberMe: false,
    }
    const [state, setState] = useState<LoginParamsType>(initialState)
    const dispatch: ThunkDispatch<AppStoreType, LoginParamsType, ActionType> = useDispatch()
    const error = useSelector<AppStoreType, string | null>(state => state.app.error)

    const onChangeTextEmailHandler = (value: string) => {
        dispatch(setAppErrorAC(''))
        setState({...state, email: value})
    }
    const onChangeTextPasswordHandler = (value: string) => {
        setState({...state, password: value})
    }
    const clickCheckbox = (checked: boolean) => {
        setState({...state, rememberMe: checked})
    }
    const clickHandler = () => {
        dispatch(loginTC(state))
    }

    return (
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                <Dialog image={LoginImg} title={'It-incubator'} subtitle={'Sign In'} links={links}>
                    <section>
                        <div className="dialog__inputs">
                            <InputText name={'Email'} type={'email'} placeholder={'Email'}
                                       onChangeText={onChangeTextEmailHandler}
                                       error={error}/>
                            <InputText name="password" placeholder="Password"
                                       onChangeText={onChangeTextPasswordHandler}/>
                        </div>
                        <Checkbox onChangeChecked={clickCheckbox}>Remember Me</Checkbox>
                        <div className="dialog__buttons dialog__block">
                            <Button onClick={clickHandler}>Login</Button>
                        </div>
                    </section>
                </Dialog>
            </div>
        </section>
    )
}