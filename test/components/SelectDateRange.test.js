import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import SelectDateRange from '../../src/components/SelectDateRange';
import { startDate, endDate, dateInFuture, freezeDate } from '../resources/dateResources';
import { dateInFutureMessage } from '../../src/config/messageConfig';

const defaultProps = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    setEndDate: jest.fn(),
    setStartDate: jest.fn(),
};
let toastCalls = [];
toast.mockImplementation((message) => {
    toastCalls.push(message);
});

/**
 * Render search stock component element.
 * @param {any} props - Input props
 * @returns Component element
 */
function getScreenElement(props) {
    return (
        <SelectDateRange
            startDate={props.startDate}
            endDate={props.endDate}
            setEndDate={props.setEndDate}
            setStartDate={props.setStartDate}
        />
    );
}

beforeEach(() => {
    toastCalls = [];
    Date.now = jest.fn(() => new Date(freezeDate));
});
afterEach(() => jest.clearAllMocks());

describe('SelectDateRange.startDateValidations', () => {
    test('Should display date cannot be in the future', async () => {
        const { getByTestId } = render(getScreenElement(defaultProps));
        const startDateInput = getByTestId('start-date').querySelector('input');
        fireEvent.change(startDateInput, { target: { value: dateInFuture } });
        expect(await toastCalls).toContain(dateInFutureMessage);
    });
});
