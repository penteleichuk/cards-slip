import {Dialog, DialogPropsType} from "../../../../components/Dialog/Dialog";
import LoginImg from "../../../../assets/images/login.png";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {RouteNames} from "../../../../constants/routes";

export const LoginPageExample = () => {
    const initPropsForm: DialogPropsType = {
        links: [
            {name: 'Sing Up', link: RouteNames.REGISTRATION},
            {name: 'Forgot Password', link: RouteNames.FORGOT}
        ],
        image: LoginImg,
        title: 'It-incubator',
        subtitle: 'Sign In',
    };

    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">
                <Dialog {...initPropsForm}>
                    <section>
                        <div className="dialog__inputs">
                            <InputText name="email" type="email" placeholder="Email"/>
                            <InputText name="password" type="password" placeholder="Password"/>
                            <div className="dialog__buttons dialog__block">
                                <Button>Login</Button>
                            </div>
                        </div>
                    </section>
                </Dialog>
            </div>
        </section>
    </>
}