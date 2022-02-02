import { getMovingAvgPrices } from '../../src/utils/priceUtil';

describe('priceUtil.getMovingAvgPrices', () => {
    test('Should return correct moving avg prices for length > movingAvgDays', () => {
        expect(getMovingAvgPrices(3, [1, 2, 3, 4, 5])).toEqual([null, null, 2, 3, 4]);
    });
    test('Should return correct moving avg prices for length === movingAvgDays', () => {
        expect(getMovingAvgPrices(3, [1, 2, 3])).toEqual([null, null, 2]);
    });
    test('Should return null array for length < movingAvgDays', () => {
        expect(getMovingAvgPrices(5, [1, 2, 3])).toEqual([null, null, null]);
    });
});
