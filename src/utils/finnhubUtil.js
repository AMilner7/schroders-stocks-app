import axios from 'axios';
import { baseURL, extensions, priceTypeCodes, token } from '../config/finnhubConfig';
import { getSearchTime } from './dateUtil';

/**
 * Create axios connection to finnhub.
 * @returns Client
 */
function finnhubClient() {
    return axios.create({ baseURL });
}

/**
 * Return stock profile if the symbol exists.
 * @param {string} symbol - Symbol to search
 * @returns Stock profile
 */
export async function getStockProfile(symbol) {
    const stockProfile = await finnhubClient().get(extensions.profileSearch, {
        params: { symbol, token }
    });
    if (!Object.keys(stockProfile.data).length) {
        return null;
    } else {
        return {
            name: stockProfile.data.name,
            id: symbol,
            exchange: stockProfile.data.exchange,
            industry: stockProfile.data.finnhubIndustry,
            currency: stockProfile.data.currency,
        };
    }
}

/**
 * Return stock prices if they exist in given time range.
 * @param {string} symbol - Symbol to search
 * @param {number} startDate - UNIX timestamp
 * @param {number} endDate - UNIX timestamp
 * @returns Stock prices
 */
export async function getStockPrices(symbol, startDate, endDate) {
    const stockPrices = await finnhubClient().get(extensions.pricesSearch, {
        params: {
            symbol,
            token,
            resolution: 'D',
            from: getSearchTime(startDate),
            to: getSearchTime(endDate),
        }
    });
    if (stockPrices.data.s === 'no_data') {
        return null;
    } else {
        const prices = {};
        priceTypeCodes.forEach((priceType) => {
            prices[priceType.priceCode] = stockPrices.data[priceType.finnhubCode];
        });
        return {
            timeStamps: stockPrices.data.t.map((t) => t * 1000),
            ...prices,
        };
    }
}