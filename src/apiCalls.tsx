type Result = {
    title: string;
    url: string;
  };
  
  async function searchReddit(keywords: string, word: string): Promise<Result[]> {
    const searchQuery = `"${keywords} ${word}"`;
    const response = await fetch(`https://www.reddit.com/r/all/search.json?q=${searchQuery}&restrict_sr=on&limit=10`);
    const data = await response.json();
    const results = data.data.children.map((child: any) => ({
      title: child.data.title,
      url: `https://www.reddit.com${child.data.permalink}`,
    }));
    return results;
  }
  
  async function searchNews(keywords: string, word: string): Promise<Result[]> {
    const searchQuery = `"${keywords} ${word}"`;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&apiKey=b3638598e03d460b9283ef92d9098566`);
    const data = await response.json();
    const results = data.articles.map((article: any) => ({
      title: article.title,
      url: article.url,
    }));
    return results;
  }
  
  async function searchScams(keywords: string): Promise<Result[]> {
    const results: Result[] = [];
  
    const scamResults = await searchReddit(keywords, "scam");
    results.push(...scamResults);
  
    const estafaResults = await searchReddit(keywords, "estafa");
    results.push(...estafaResults);
  
    const scamNewsResults = await searchNews(keywords, "scam");
    results.push(...scamNewsResults);
  
    const estafaNewsResults = await searchNews(keywords, "estafa");
    results.push(...estafaNewsResults);
  
    return results;
  }
  
  export default searchScams;