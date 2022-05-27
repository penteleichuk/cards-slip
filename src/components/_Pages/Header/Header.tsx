import {Link} from "react-router-dom"
import {routes} from "../../../routes"
import './Header.css';

export const Header = () => {
    //header
    return <header className={'header'}>
        {routes.map(route => route.public && <Link key={route.path} to={route.path}>{route.name}</Link>)}
    </header>
}