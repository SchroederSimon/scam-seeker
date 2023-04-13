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

export function searchGoogle(keywords: string) {
    const searchQuery = encodeURIComponent(keywords + ' scam OR ' + keywords + ' estafa');
    const cx = process.env.CSE_CX_GOOGLE;
    const apiKey = process.env.API_KEY;
    const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${cx}&key=${apiKey}`;
  
    axios.get(url)
      .then(response => {
        console.log(response.data);
        // TODO: Process search results
      })
      .catch(error => {
        console.error(error);
      });
  }