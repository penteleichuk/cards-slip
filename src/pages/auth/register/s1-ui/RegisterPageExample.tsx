import {Dialog, DialogPropsType} from "../../../../components/Dialog/Dialog";
import RegistrationImg from "../../../../assets/images/registration.png";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";

export const RegisterPageExample = () => {
    const initPropsForm: DialogPropsType = {
        image: RegistrationImg,
        title: 'It-incubator',
        subtitle: 'Sign Up',
    };

    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                <Dialog {...initPropsForm}>
                    <form>
                        <div className="dialog__inputs">
                            <InputText name="email" type="email" placeholder="Email"/>
                            <InputText name="password" type="password" placeholder="Password"/>
                            <InputText name="confirmPassword" type="password" placeholder="Confirm password"/>
                            <div className="dialog__buttons dialog__block">
                                <Button>Cancel</Button>
                                <Button>Register</Button>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </div>
        </section>
    </>
}