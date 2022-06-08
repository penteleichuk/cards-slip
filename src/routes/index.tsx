import {RouteNames} from "../constants/routes";
import {
    ExamplePage,
    PackPage,
    ForgotPage,
    LoginPage,
    NotFoundPage,
    ProfilePage,
    RegisterPage,
    SetPasswordPage, PackPageExample
} from "./../pages/pages";
import {CardPage} from "../pages/card/s1-ui/CardPage";

type RouteType = {
    name: string
    public: boolean
    path: string
    component: JSX.Element
}

export const routes: Array<RouteType> = [
    {
        name: 'Pack',
        public: true,
        path: RouteNames.HOME,
        component: <PackPage/>,
    },
    {
        name: 'CardS',
        public: true,
        path: RouteNames.CARDS,
        component: <CardPage/>,
    },
    {
        name: 'Pack example',
        public: true,
        path: RouteNames.PACK_EXAMPLE,
        component: <PackPageExample/>,
    },
    {
        name: 'Example',
        public: false,
        path: RouteNames.EXAMPLE,
        component: <ExamplePage/>,
    },
    {
        name: 'Profile',
        public: true,
        path: RouteNames.PROFILE,
        component: <ProfilePage/>,
    },
    {
        name: 'Login',
        public: true,
        path: RouteNames.LOGIN,
        component: <LoginPage/>,
    },
    {
        name: 'Registration',
        public: true,
        path: RouteNames.REGISTRATION,
        component: <RegisterPage/>,
    },
    {
        name: 'Forgot',
        public: true,
        path: RouteNames.FORGOT,
        component: <ForgotPage/>,
    },
    {
        name: 'Set password',
        public: true,
        path: RouteNames.SET_PASSWORD,
        component: <SetPasswordPage/>,
    },
    {
        name: 'Not found',
        public: false,
        path: RouteNames.NOT_FOUND,
        component: <NotFoundPage/>,
    },
];