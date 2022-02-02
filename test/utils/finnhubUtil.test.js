import axios from 'axios';
import { getStockPrices, getStockProfile } from '../../src/utils/finnhubUtil';
import Nock from 'nock';
import { baseURL } from '../../src/config/finnhubConfig';
import {
    existingPrices,
    existingProfile,
    pricesSearchExtension,
    profileSearchExtension,
    sampleNoPricesResponse,
    samplePricesResponse,
    sampleProfileResponse,
    symbol,
} from '../resources/finnhubResources';
import { endDate, startDate } from '../resources/dateResources';
axios.defaults.adapter = require('axios/lib/adapters/http');

let scope;
beforeEach(() => (scope = Nock(baseURL)));
afterEach(() => scope.done());

describe('finnhubUtil.getStockProfile', () => {
    test('Should return data when profile exists', async () => {
        scope.get(profileSearchExtension).reply(200, sampleProfileResponse);
        const stockProfile = await getStockProfile(symbol);
        expect(stockProfile).toEqual(existingProfile);
    });
    test('Should return null when no stock profile exists', async () => {
        scope.get(profileSearchExtension).reply(200, {});
        const stockProfile = await getStockProfile(existingProfile.id);
        expect(stockProfile).toEqual(null);
    });
});

describe('finnhubUtil.getStockPrices', () => {
    test('Should return data when stock prices exist', async () => {
        scope.get(pricesSearchExtension).reply(200, samplePricesResponse);
        const stockPrices = await getStockPrices(symbol, startDate, endDate);
        expect(stockPrices).toEqual(existingPrices);
    });
    test('Should return null when no stock prices exist', async () => {
        scope.get(pricesSearchExtension).reply(200, sampleNoPricesResponse);
        const stockPrices = await getStockPrices(symbol, startDate, endDate);
        expect(stockPrices).toEqual(null);
    });
});
