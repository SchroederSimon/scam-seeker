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

/* Google calls*/
export function searchGoogle(keywords: string) {
    const searchQuery = encodeURIComponent(`${keywords} scam OR ${keywords} estafa`);
    
    const cx = process.env.CSE_CX_GOOGLE;
    const apiKey = process.env.API_KEY;

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}`;

    axios.get(url)
    .then(response => {
      const items = response.data.items;
      const keywordsMap = new Map<string, number>();
      const keywords = ['scam', 'estafa'];

      let totalMatches = 0;
      items.forEach((item: { title: string; snippet: string }) => {
        const title = item.title.toLowerCase();
        const snippet = item.snippet.toLowerCase();
        keywords.forEach(keyword => {
          if (title.includes(keyword) || snippet.includes(keyword)) {
            totalMatches++;
          }
        });
      });
    
      const confidencePercentage = Math.round((totalMatches / items.length) * 100);
    
      console.log(`The confidence percentage is ${confidencePercentage}%`);
      console.log(keywordsMap);
      
      // TODO: Calculate the confidence percentage and display it to the user
    })
    .catch(error => {
      console.error(error);
    });
}




