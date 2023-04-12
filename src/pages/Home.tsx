import axios from 'axios';
import { useState } from 'react';
import '../pages/Home.css'
import { searchReddit } from '../apiCalls';



function Home() {

    const [keywords, setKeywords] = useState("");

    function handleSearch() {
        searchReddit(keywords);
    }


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
                        <input type="text" placeholder='Search scammer' onChange={(e) => setKeywords(e.target.value)} />
                        <button onClick={handleSearch}>SEARCH</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
