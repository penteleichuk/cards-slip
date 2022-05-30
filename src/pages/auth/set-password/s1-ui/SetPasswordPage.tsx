import {Dialog, DialogPropsType} from "../../../../components/Dialog/Dialog";
import SetPasswordImg from "../../../../assets/images/set_password.png";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";

export const SetPasswordPage = (): JSX.Element => {
    const initPropsForm: DialogPropsType = {
        image: SetPasswordImg,
        title: 'It-incubator',
        subtitle: 'Create new password',
    };

    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                <Dialog {...initPropsForm}>
                    <section>
                        <div className="dialog__inputs">
                            <div className="dialog__description">
                                Create new password and we will send you further instructions to email
                            </div>
                            <InputText name="login" placeholder="Email"/>
                            <div className="dialog__buttons">
                                <Button>Create new password</Button>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </div>
        </section>
    </>
}