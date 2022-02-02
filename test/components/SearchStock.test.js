import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchStock from '../../src/components/SearchStock';
import {
    inputTooLongMessage,
    noStockPricesMessage,
    noStockProfileMessage,
    noValueToSearch,
    onlyWordCharactersMessage,
} from '../../src/config/messageConfig';
import { toast } from 'react-hot-toast';
import { endDate, startDate, newStartDate } from '../resources/dateResources';
import {
    existingPrices,
    existingProfile,
    symbol,
    existingStockData,
} from '../resources/finnhubResources';

const inputBoxTestId = 'input-text';
const defaultProps = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    stockData: {},
    selectedStocks: new Set(),
    setStockData: jest.fn(),
};
let toastCalls = [];
toast.mockImplementation((message) => {
    toastCalls.push(message);
});
const finnhubUtil = require('../../src/utils/finnhubUtil');
finnhubUtil.getStockPrices = jest.fn();
finnhubUtil.getStockProfile = jest.fn();

/**
 * Render search stock component element.
 * @param {any} props - Input props
 * @returns Component element
 */
function getScreenElement(props) {
    return (
        <SearchStock
            startDate={props.startDate}
            endDate={props.endDate}
            setStockData={props.setStockData}
            stockData={props.stockData}
            selectedStocks={props.selectedStocks}
        />
    );
}

/**
 * Set the user input text into the search text box.
 * @param {HTMLElement} element - HTML element
 * @param {string} value - Input value
 */
function setInputText(element, value) {
    const field = element(inputBoxTestId).querySelector('input');
    fireEvent.change(field, { target: { value } });
}

/**
 * Press enter in the textbox.
 * @param {HTMLElement} element - HTML element
 */
function pressEnter(element) {
    fireEvent.keyDown(element(inputBoxTestId), { key: 'Enter' });
}

/**
 * Return the search button element.
 * @returns Button element
 */
function getSearchButton() {
    return screen.getByTestId('search-button');
}

beforeEach(() => (toastCalls = []));
afterEach(() => jest.clearAllMocks());

describe('SearchStock.checkValidations', () => {
    afterEach(() => expect(getSearchButton()).toBeDisabled());
    test('Should not be able to search for empty input', async () => {
        const { getByTestId } = render(getScreenElement(defaultProps));
        pressEnter(getByTestId);
        expect(toastCalls).toContain(noValueToSearch);
    });
    test('Should not be able to search for non-word symbols', async () => {
        const { getByText, getByTestId } = render(getScreenElement(defaultProps));
        setInputText(getByTestId, 'A*');
        expect(getByText(onlyWordCharactersMessage)).toBeTruthy();
    });
    test('Should not be able to search for long symbol', () => {
        const { getByText, getByTestId } = render(getScreenElement(defaultProps));
        setInputText(getByTestId, 'asdfg');
        expect(getByText(inputTooLongMessage)).toBeTruthy();
        pressEnter(getByTestId);
        expect(finnhubUtil.getStockProfile).not.toHaveBeenCalled();
    });
});

describe('SearchStock.checkSearchEnabled', () => {
    test('Should be able to search for valid input', () => {
        const { getByTestId } = render(getScreenElement(defaultProps));
        fireEvent.keyDown(getByTestId(inputBoxTestId), { key: 'A' });
        setInputText(getByTestId, 'asdf');
        expect(getSearchButton()).not.toBeDisabled();
    });
});

describe('SearchStock.updateStockData', () => {
    test('Should display no stock profile when stock does not exist', async () => {
        finnhubUtil.getStockProfile.mockReturnValueOnce(null);
        const { getByTestId } = render(getScreenElement(defaultProps));
        setInputText(getByTestId, symbol);
        await fireEvent.click(getSearchButton());
        expect(await toastCalls).toContain(noStockProfileMessage);
    });
    test('Should display stock profile but no prices available', async () => {
        finnhubUtil.getStockProfile.mockReturnValueOnce(existingProfile);
        finnhubUtil.getStockPrices.mockReturnValueOnce(null);
        const { getByTestId } = render(getScreenElement(defaultProps));
        setInputText(getByTestId, symbol);
        await pressEnter(getByTestId);
        expect(await toastCalls).toContain(noStockPricesMessage);
    });
    test('Should initialise stock data for newly searched stock', async () => {
        const props = { ...defaultProps };
        finnhubUtil.getStockProfile.mockReturnValueOnce(existingProfile);
        finnhubUtil.getStockPrices.mockReturnValueOnce(existingPrices);
        const { getByTestId } = render(getScreenElement(props));
        setInputText(getByTestId, symbol);
        await pressEnter(getByTestId);
        expect(await props.setStockData).toHaveBeenCalledWith(existingStockData);
    });
});

describe('SearchStock.useEffect', () => {
    test('Should not update stockData when no selected stocks', () => {
        const props = { ...defaultProps };
        const { rerender } = render(getScreenElement(props));
        props.startDate = newStartDate;
        rerender(getScreenElement(props));
        expect(finnhubUtil.getStockPrices).not.toHaveBeenCalled();
    });
    test('Should update stockData when user has selected stocks', async () => {
        finnhubUtil.getStockPrices.mockReturnValueOnce(existingPrices);
        const props = { ...defaultProps };
        const { rerender } = render(getScreenElement(props));
        props.startDate = newStartDate;
        props.stockData = existingStockData;
        props.selectedStocks.add(symbol);
        rerender(getScreenElement(props));
        expect(finnhubUtil.getStockPrices).toHaveBeenCalled();
    });
    test('Should not update stockData when selected stocks have data for date range', async () => {
        const props = { ...defaultProps };
        const { rerender } = render(getScreenElement(props));
        props.selectedStocks.add(symbol);
        props.stockData = existingStockData;
        rerender(getScreenElement(props));
        rerender(getScreenElement(props));
        expect(finnhubUtil.getStockPrices).toHaveBeenCalledTimes(1);
    });
});
