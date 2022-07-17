import {RouteNames} from "../constants/routes";
import {
    ForgotPage,
    LoginPage,
    NotFoundPage,
    ProfilePage,
    RegisterPage,
    SetPasswordPage,
    PackPage
} from "./../pages/pages";
import {Navigate} from "react-router-dom";

type RouteType = {
    name: string
    public: boolean
    path: string
    component: JSX.Element
}

export const routes: Array<RouteType> = [
    {
        name: 'Card',
        public: true,
        path: RouteNames.HOME,
        component: <Navigate to={RouteNames.PACK}/>,
    },
    {
        name: 'Pack',
        public: true,
        path: RouteNames.PACK,
        component: <PackPage/>,
    },
    {
        name: 'Profile',
        public: true,
        path: RouteNames.PROFILE,
        component: <ProfilePage/>,
    },
    {
        name: 'Profile',
        public: true,
        path: RouteNames.PROFILE_ARG,
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
