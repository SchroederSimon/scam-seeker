
import '../pages/Home.css'

function Home() {
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
                        <input type="text" placeholder='Search scammer' />
                        <button>SEARCH</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
