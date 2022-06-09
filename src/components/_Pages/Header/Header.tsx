import {Link} from "react-router-dom"
import {routes} from "../../../routes"

export const Header = () => {
    return <header className={'header'}>
        {routes.map(route => route.public && <Link key={route.path} to={route.path} state={{margin: "10px"}}>{route.name}</Link>)}
    </header>
}