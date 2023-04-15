interface Post {
    id: string;
    title: string;
    author: string;
    created_utc: number;
    url: string;
    selftext?: string;
    thumbnail?: string;
    num_comments?: number;
    score?: number;
    subreddit?: string;
    subreddit_name_prefixed?: string;
}
export default Post;