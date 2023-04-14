import { useState } from 'react';
import '../pages/Home.css'
import { searchGoogle, searchReddit } from '../apiCalls';



function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleGoogleSearch = () => {
        searchGoogle(searchTerm);
    };

    return (
        <div className="home-container">
            <div className="nav-bar-container">
                <h1>SCAM?</h1>
                <ul>
                    <li>HOME</li>
                    <li>ABOUT</li>
                    <li>ARTICLES</li>
                </ul>
            </div>
            <div className="search-bar-container">
                <div className="search-bar">
                    <h1>SEARCH TO FIND THE SCAM</h1>
                    <div className="search-bar-content">
                        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
                        <button onClick={handleGoogleSearch}>Search Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
