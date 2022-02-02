import { extensions, token } from '../../src/config/finnhubConfig';
import { endDate, startDate } from './dateResources';

const searchStartDate = startDate / 1000;

const searchEndDate = endDate / 1000;

export const symbol = 'AAPL';

export const sampleProfileResponse = {
    name: 'Apple',
    finnhubIndustry: 'Tech',
    currency: 'USD',
    exchange: 'US Exchange',
};

export const existingProfile = {
    name: sampleProfileResponse.name,
    id: symbol,
    currency: sampleProfileResponse.currency,
    exchange: sampleProfileResponse.exchange,
    industry: sampleProfileResponse.finnhubIndustry,
};

const priceList = [100, 101];

export const samplePricesResponse = {
    s: 'OK',
    t: [searchStartDate, searchEndDate],
    c: priceList,
    h: priceList,
    o: priceList,
    l: priceList,
};

export const existingPrices = {
    timeStamps: [startDate, endDate],
    close: priceList,
    open: priceList,
    low: priceList,
    open: priceList,
    high: priceList,
};

const stockData = {};
stockData[symbol] = { prices: { ...existingPrices }, profile: { ...existingProfile } };
export const existingStockData = stockData;

export const sampleNoPricesResponse = { s: 'no_data' };

const symbolTokenParams = `?symbol=${symbol}&token=${token}`;

export const profileSearchExtension = `${extensions.profileSearch}${symbolTokenParams}`;

export const pricesSearchExtension =
    `${extensions.pricesSearch}${symbolTokenParams}` +
    `&resolution=D&from=${searchStartDate}&to=${searchEndDate}`;
