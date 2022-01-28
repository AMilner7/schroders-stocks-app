export const baseURL = 'https://finnhub.io/api/v1';

export const token = 'c7nhgj2ad3ifj5l0ecmg';

export const extensions = {
    pricesSearch: '/stock/candle',
    profileSearch: '/stock/profile2',
};

export const priceTypeCodes = [
    {
        displayName: 'Open',
        priceCode: 'open',
        finnhubCode: 'o',
    },
    {
        displayName: 'High',
        priceCode: 'high',
        finnhubCode: 'h',
    },
    {
        displayName: 'Low',
        priceCode: 'low',
        finnhubCode: 'l',
    },
    {
        displayName: 'Close',
        priceCode: 'close',
        finnhubCode: 'c',
    },
];
