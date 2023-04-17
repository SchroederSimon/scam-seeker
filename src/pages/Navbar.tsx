
import '../pages/Navbar.css'
import { Link } from 'react-router-dom';




function Navbar() {

    return (
        <div className="navbar">
            <div className="nav-bar-container">
                <h1>SCAM SEARCH</h1>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/about">ABOUT</Link></li>
                    <li><Link to="/articles">ARTICLES</Link></li>
                </ul>
            </div>
        </div>

    )
}

export default Navbar;