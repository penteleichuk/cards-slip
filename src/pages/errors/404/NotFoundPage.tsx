import {Link} from 'react-router-dom';
import './NotFound.css';

export const NotFoundPage = () => {
    return (
        <div className={'not_found'}>
            <nav className="shelf">
                <Link className='book home-page' to="/">Go home</Link>
                <Link className='book about-us' to="/example">Go example</Link>
                <Link className='book contact' to="/">Go home</Link>
                <Link className='book faq' to="/">Go home</Link>

                <span className="book not-found"></span>

                <span className="door left"></span>
                <span className="door right"></span>
            </nav>
            <h1 className={'not_found__title'}>Error 404</h1>
            <p className={'not_found__description'}>The page you're loking for can't be found</p>
        </div>
    )
}