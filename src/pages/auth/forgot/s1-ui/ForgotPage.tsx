import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {IdleForgotDialog} from "../../../../components/_Auth/IdleForgotDialog/IdleForgotDialog";
import {SuccessForgotDialog} from "../../../../components/_Auth/SuccessForgotDialog/SuccessForgotDialog";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../app/s2-bll/store";
import {ForgotStateType} from "../s2-bll/ForgotInitState";

export const ForgotPage = (): JSX.Element => {
    const state = useSelector<AppStoreType, ForgotStateType>(state => state.forgot);

    return <>
        <section className="content forgot">
            <AnimationBackground/>
            <div className="container">
                {state.status === 'success' ? <SuccessForgotDialog sendEmail={state.sendEmail}/> : <IdleForgotDialog/>}
            </div>
        </section>
    </>
}