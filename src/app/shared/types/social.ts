export interface Social {
    reddit: Reddit;
    twitter: Twitter;
}

export interface Reddit {
    avg_active_users: number;
    subscribers: number;
}

export interface Twitter {
    status_count: number;
    followers_count: number;
}
    


