import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
    return (
        <div className='nav'>
            <div className='nav-left'>
                <Link to='/movies'>Movies</Link>
                <Link to='/shows'>Shows</Link>
                <Link to='/calendar'>Calendar</Link>
            </div>
            <div className='nav-right'>
                <Link to='/me'>My Lists</Link>
            </div>
        </div>
    );
}

export default Navigation;
