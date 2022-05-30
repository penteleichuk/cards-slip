import {Dialog, DialogPropsType} from "../../../../components/Dialog/Dialog";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";
import ForgotImg from '../../../../assets/images/forgot_img.png'
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";

export const ForgotPage = (): JSX.Element => {

    const initPropsForm: DialogPropsType = {
        image: ForgotImg,
        title: 'It-incubator',
        subtitle: 'Forgot your password?',
    };

    return <>
        <section className="content forgot">
            <AnimationBackground/>
            <div className="container">
                <Dialog {...initPropsForm}>
                    <form>
                        <div className="dialog__inputs">
                            <InputText name="login" placeholder="Email"/>
                            <div className="dialog__buttons">
                                <Button>Send instructions</Button>
                            </div>
                            <div className="dialog__description">
                                Enter your email address and we will send you further instructions
                            </div>
                        </div>
                        <div className="dialog__footer">
                            <a href="#">I have an Account ?</a>
                        </div>
                    </form>
                </Dialog>
            </div>
        </section>
    </>
}