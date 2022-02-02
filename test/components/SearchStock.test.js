import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchStock from '../../src/components/SearchStock';
import {
    inputTooLongMessage,
    noValueToSearch,
    onlyWordCharactersMessage,
} from '../../src/config/messageConfig';
import { toast } from 'react-hot-toast';

const inputBoxTestId = 'input-text';
const props = {
    startDate: new Date(1640995211900),
    endDate: new Date(1640995211900),
    stockData: {},
    selectedStocks: new Set(),
    setStockData: jest.fn(),
};
const screenSetup = (
    <SearchStock
        startDate={props.startDate}
        endDate={props.endDate}
        setStockData={props.setStockData}
        stockData={props.stockData}
        selectedStocks={props.selectedStocks}
    />
);

let toastCalls = [];
toast.mockImplementation((message) => {
    toastCalls.push(message);
});

beforeEach(() => (toastCalls = []));

describe('SearchStock.checkValidations', () => {
    afterEach(() => expect(screen.getByTestId('search-button')).toBeDisabled());
    test('Should not be able to search for empty input', async () => {
        const { getByTestId } = render(screenSetup);
        fireEvent.keyDown(getByTestId(inputBoxTestId), { key: 'Enter' });
        expect(toastCalls).toContain(noValueToSearch);
    });
    test('Should not be able to search for non-word symbols', async () => {
        const { getByText, getByTestId } = render(screenSetup);
        const field = getByTestId(inputBoxTestId).querySelector('input');
        fireEvent.change(field, { target: { value: 'A*' } });
        expect(getByText(onlyWordCharactersMessage)).toBeTruthy();
    });
    test('Should not be able to search for long symbol', () => {
        const { getByText, getByTestId } = render(screenSetup);
        const field = getByTestId(inputBoxTestId).querySelector('input');
        fireEvent.change(field, { target: { value: 'asdfg' } });
        expect(getByText(inputTooLongMessage)).toBeTruthy();
    });
});
