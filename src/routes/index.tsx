import { RouteNames } from "../constants/routes";
import { ExamplePage, ForgotPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, SetPasswordPage } from "./../pages/pages"

type RouteType = {
	path: string
	component: JSX.Element
}

export const routes: Array<RouteType> = [
	{
		path: RouteNames.HOME,
		component: <ExamplePage />,
		// component: <HomePage />,
	},
	{
		path: RouteNames.EXAMPLE,
		component: <ExamplePage />,
	},
	{
		path: RouteNames.PROFILE,
		component: <ProfilePage />,
	},
	{
		path: RouteNames.LOGIN,
		component: <LoginPage />,
	},
	{
		path: RouteNames.REGISTRATION,
		component: <RegisterPage />,
	},
	{
		path: RouteNames.FORGOT,
		component: <ForgotPage />,
	},
	{
		path: RouteNames.SET_PASSWORD,
		component: <SetPasswordPage />,
	},
	{
		path: RouteNames.NOT_FOUND,
		component: <NotFoundPage />,
	},
];