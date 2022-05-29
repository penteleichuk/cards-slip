import {Link} from "react-router-dom"
import {routes} from "../../../routes"
import './Header.scss';

export const Header = () => {
    return <>
        <header className={'header'}>
            <div className="container">
                <div className="header__rows">
                    {routes.map(route => route.public && <Link key={route.path} to={route.path}>{route.name}</Link>)}
                </div>
            </div>
        </header>
    </>
}