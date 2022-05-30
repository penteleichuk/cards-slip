import React from "react";
import {Dialog, DialogPropsType} from "../../Dialog/Dialog";
import SetPasswordImg from "../../../assets/images/set_password.png";
import ForgotSuccessImg from "../../../assets/images/forgot_img_success.png";

export const SuccessForgotDialog = React.memo(() => {

    const emailProps = 'example@mail.com';
    const initPropsForm: DialogPropsType = {
        image: SetPasswordImg,
        title: 'It-incubator',
        subtitle: 'Check Email',
    };

    return <>
        <Dialog {...initPropsForm}>
            <form>
                <div className="dialog__inputs dialog__center">
                    <div className="dialog__image">
                        <img src={ForgotSuccessImg} alt=""/>
                    </div>
                    <div className="dialog__description">
                        We’ve sent an Email with instructions to {emailProps}
                    </div>
                </div>
            </form>
        </Dialog>
    </>
});