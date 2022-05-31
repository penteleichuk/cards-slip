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

export const LoginPage = (): JSX.Element => {
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
        <div className='login'>
            <div className="wrapper">
                <div className="paper">
                    <div>
                        <h1>IT-INCUBATOR</h1>
                    </div>
                    <div>
                        <h2>Sign In</h2>
                    </div>
                    <div>
                        <InputText name={'Email'} placeholder={'Email'} onChangeText={onChangeTextEmailHandler}
                                   error={error}/>
                        <InputText name="password" placeholder="Password" onChangeText={onChangeTextPasswordHandler}/>
                    </div>
                    <Checkbox onChangeChecked={clickCheckbox}>Remember Me</Checkbox>
                    <Button onClick={clickHandler}>Login</Button>
                    <div>
                        <h4>Don't have account?</h4>
                        <Link to={RouteNames.REGISTRATION}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}