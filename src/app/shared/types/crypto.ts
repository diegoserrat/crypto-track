export interface Crypto {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
    price_btc: string;
    market_cap_usd: string;
    volume_24h: number;
    volume_24a: number;
    csupply: string;
    tsupply: string;
    msupply: string;
}

export interface CryptoResponse {
    data: Crypto[];
    info: { 
        coins_num: number;
        time: number;
    }   
}

export interface GlobalStats {
    coins_count: number;
    active_markets: number;
    total_volume: number;
    btc_d: string;
    eth_d: string;
    mcap_change: string;
    volume_change: string;
    avg_change_percent: string;
    volume_ath: number;
    mcap_ath: number;
}