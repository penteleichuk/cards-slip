import {RouteNames} from "../constants/routes";
import {
    ExamplePage,
    ForgotPage,
    HomePage,
    LoginPage,
    NotFoundPage,
    ProfilePage,
    RegisterPage,
    SetPasswordPage
} from "./../pages/pages"

type RouteType = {
    name: string
    public: boolean
    path: string
    component: JSX.Element
}

export const routes: Array<RouteType> = [
    {
        name: 'Home',
        public: true,
        path: RouteNames.HOME,
        component: <HomePage/>,
    },
    {
        name: 'Example',
        public: true,
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