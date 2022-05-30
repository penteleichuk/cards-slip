import {useState} from "react";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {IdleForgotDialog} from "../../../../components/_Auth/IdleForgotDialog/IdleForgotDialog";
import {SuccessForgotDialog} from "../../../../components/_Auth/SuccessForgotDialog/SuccessForgotDialog";

export const ForgotPage = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [requestStatus, setRequestStatus] = useState<'idle' | 'success'>('success')

    return <>
        <section className="content forgot">
            <AnimationBackground/>
            <div className="container">
                {requestStatus === 'idle' ? <IdleForgotDialog/> : <SuccessForgotDialog/> }
            </div>
        </section>
    </>
}