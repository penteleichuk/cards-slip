import React from "react";
import {Dialog} from "../../Dialog/Dialog";
import ForgotImg from "../../../assets/images/forgot_img.png";
import ForgotSuccessImg from "../../../assets/images/forgot_img_success.png";
import {Button} from "../../Button/Button";
import {useDispatch} from "react-redux";
import {setStatusForget} from "../../../pages/auth/forgot/s2-bll/ForgotActions";

export const SuccessForgotDialog: React.FC<{ sendEmail: string }> = React.memo(({sendEmail}) => {
    const dispatch = useDispatch<any>();

    const clickHandler = () => {
        dispatch(setStatusForget({status: 'idle'}))
    }

    return <>
        <Dialog image={ForgotImg} title={'It-incubator'} subtitle={'Check Email'}>
            <section>
                <div className="dialog__inputs dialog__center">
                    <div className="dialog__image">
                        <img src={ForgotSuccessImg} alt=""/>
                    </div>
                    <div className="dialog__description">
                        We’ve sent an Email with instructions to <strong>{sendEmail}</strong>
                    </div>
                    <div className="dialog__buttons">
                        <Button onClick={clickHandler}>Come back</Button>
                    </div>
                </div>
            </section>
        </Dialog>
    </>
});