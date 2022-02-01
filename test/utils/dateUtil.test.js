import { getDate, getSearchTime } from '../../src/utils/dateUtil';
import { dateMap } from './resources/dateResources';

describe('dateUtil.getDate', () => {
    test.each(dateMap)('Should return correct date format for UNIX stamp', (date) => {
        expect(getDate(date.unix)).toEqual(date.formatted);
    });
});

describe('dateUtil.getSearchTime', () => {
    test.each(dateMap)('Should return correct finnhub search time format', (date) => {
        expect(getSearchTime(date.unix)).toEqual(date.searchTime);
    });
});
