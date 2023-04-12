import axios from 'axios';


/* Reddit calls */


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