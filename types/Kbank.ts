export interface Kbank {
    company?:  string;
    status?:   string;
    id?:       string;
    platform?: string;
    type?:     string;
    detail?:   Detail;
}

export interface Detail {
    fullMerchantId?: string;
    ippMerchantId?:  string;
    publicKey?:      string;
    smartPay?:       string;
}
