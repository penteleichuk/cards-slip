import {Dialog} from "../../../../components/Dialog/Dialog";
import RegistrationImg from "../../../../assets/images/registration.png";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";

export const RegisterPageExample = () => {
    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                {/*<Dialog {...initPropsForm}>*/}
                <Dialog image={RegistrationImg} title={'It-incubator'} subtitle={'Sign Up'}>
                    <section>
                        <div className="dialog__inputs">
                            <InputText name="email" type="email" placeholder="Email"/>
                            <InputText name="password" type="password" placeholder="Password"/>
                            <InputText name="confirmPassword" type="password" placeholder="Confirm password"/>
                            <div className="dialog__buttons dialog__block">
                                <Button>Cancel</Button>
                                <Button>Register</Button>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </div>
        </section>
    </>
}