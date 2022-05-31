import {Dialog, DialogLinkType} from "../../../../components/Dialog/Dialog";
import LoginImg from "../../../../assets/images/login.png";
import {InputText} from "../../../../components/InputText/InputText";
import {Button} from "../../../../components/Button/Button";
import {AnimationBackground} from "../../../../components/AnimationBackground/AnimationBackground";
import {RouteNames} from "../../../../constants/routes";

export const LoginPageExample = () => {
    const links:DialogLinkType[] = [
        {name: 'Sing Up', link: RouteNames.REGISTRATION},
        {name: 'Forgot Password', link: RouteNames.FORGOT}
    ];

    return <>
        <section className="content set-password">
            <AnimationBackground/>
            <div className="container">

                <Dialog image={LoginImg} title={'It-incubator'} subtitle={'Sign In'} links={links}>
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