import React from "react";
import {Dialog, DialogPropsType} from "../../Dialog/Dialog";
import {InputText} from "../../InputText/InputText";
import {Button} from "../../Button/Button";
import ForgotImg from "../../../assets/images/forgot_img.png";
import {RouteNames} from "../../../constants/routes";
import {Link} from "react-router-dom";

export const IdleForgotDialog = React.memo(() => {
    const initPropsForm: DialogPropsType = {
        image: ForgotImg,
        title: 'It-incubator',
        subtitle: 'Forgot your password?',
    };

    const clickHandler = () => {
        console.log('click')
    }

    return <>
        <Dialog {...initPropsForm}>
            <section style={{justifyContent: "space-evenly"}}>
                <div className="dialog__inputs">
                    <InputText name="login" placeholder="Email"/>
                    <div className="dialog__buttons">
                        <Button onClick={clickHandler}>Send instructions</Button>
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