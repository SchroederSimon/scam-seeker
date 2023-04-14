import axios from 'axios';


/* Reddit calls (i think will be good just retrieve some posts with good karma so the user can read and leave google api to give the %)*/
export function searchReddit(keywords: string) {
    const searchQuery = `${keywords} scam OR ${keywords} estafa`;
    const subreddit = 'all';
    const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${searchQuery}`;

    axios.get(url)
        .then(response => {
            console.log(response.data.data.children[0].data.url);
            // TODO: Process search results
        })
        .catch(error => {
            console.error(error);
        });
}

export async function searchGoogle(keywords: string): Promise<number> {
    const searchQuery = encodeURIComponent(`${keywords} scam OR ${keywords} estafa`);

    const cx = process.env.CSE_CX_GOOGLE;
    const apiKey = process.env.API_KEY;

    const startIndex = 11; // Index of the first result to return (second page)
    const numResults = 10; // Number of results to return per page

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&start=${startIndex}&num=${numResults}`;

    try {
        const response = await axios.get(url);
        const items = response.data.items;
        let totalMatches = 0;
        items.forEach((item: { title: string; snippet: string; }) => {
            const title = item.title.toLowerCase();
            const snippet = item.snippet.toLowerCase();
            ['scam', 'estafa'].forEach(keyword => {
                if (title.includes(keyword) || snippet.includes(keyword)) {
                    totalMatches++;
                }
            });
        });
        console.log(totalMatches)
        const confidencePercentage = Math.round((totalMatches / items.length) * 70);
        console.log(confidencePercentage)
        return confidencePercentage;
    } catch (error) {
        console.error(error);
        throw error;
    }
}




