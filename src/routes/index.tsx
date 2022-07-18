import {RouteNames} from "../constants/routes";
import {Navigate} from "react-router-dom";
import {
    ForgotPage,
    LoginPage,
    NotFoundPage,
    PacksProfile,
    RegisterPage,
    SetPasswordPage,
    PacksPage, CardsProfile, CardsEvery
} from "./../pages/pages";

type RouteType = {
    name: string
    public: boolean
    path: string
    component: JSX.Element
}

export const routes: Array<RouteType> = [
    {
        name: 'Packs every',
        public: true,
        path: RouteNames.HOME,
        component: <Navigate to={RouteNames.PROFILE}/>,
    },
    {
        name: 'Packs every',
        public: true,
        path: RouteNames.PACK,
        component: <PacksPage/>,
    },
    {
        name: 'Cards every',
        public: true,
        path: RouteNames.CARDS,
        component: <CardsEvery/>,
    },
    {
        name: 'Profile packs',
        public: true,
        path: RouteNames.PROFILE,
        component: <PacksProfile/>,
    },
    {
        name: 'Profile cards',
        public: true,
        path: RouteNames.PROFILE_ARG,
        component: <CardsProfile/>,
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
