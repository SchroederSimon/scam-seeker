import axios from 'axios';


/* Reddit calls (i think will be good just retrieve some posts with good karma so the user can read and leave google api to give the %)*/
export async function searchReddit(searchTerm: string) {
    const subreddit = 'all';
    const searchTerms = ['estafa', 'scam', 'fraud', 'piramidal', 'esquema', 'ponzi', 'scheme'];
    const matchingTerm = searchTerms.find((term) => searchTerm.includes(term));

    const searchQuery = matchingTerm
        ? `${searchTerm} ${matchingTerm}`
        : `${searchTerm} ${searchTerms.join(' OR ')}`;

    const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${searchQuery}&sort=relevance&limit=15`;

    try {
        const response = await axios.get(url);
        const posts = response.data.data.children.map((child: any) => child.data);
        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}




export async function searchGoogle(keywords: string): Promise<number> {
    const searchQuery = encodeURIComponent(`${keywords} scam OR ${keywords} estafa OR ${keywords} fraud`);

    const cx = process.env.CSE_CX_GOOGLE;
    const apiKey = process.env.API_KEY;

    const startIndex = 11;
    const numResults = 10; 

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&start=${startIndex}&num=${numResults}`;

    try {
        const response = await axios.get(url);
        const items = response.data.items;
        let totalMatches = 0;
        items.forEach((item: { title: string; snippet: string; }) => {
            const title = item.title.toLowerCase();
            const snippet = item.snippet.toLowerCase();
            ['scam', 'estafa', 'fraud', 'piramidal', 'esquema', 'ponzi', 'scheme'].forEach(keyword => {
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




