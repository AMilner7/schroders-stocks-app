/**
 * Return moving average prices.
 * @param {number} movingAvgDays - Moving average days
 * @param {number[]} prices - Stock prices
 * @returns Array of moving average prices
 */
export function getMovingAvgPrices(movingAvgDays, labels) {
    let res = [];
    let sum = 0;
    let firstIndex = 0;
    let i = 0;
    while (i < labels.length) {
        sum += labels[i];
        if (i >= movingAvgDays - 1) {
            const avg = sum / movingAvgDays;
            res.push(Number(avg.toFixed(2)));
            sum -= labels[firstIndex];
            firstIndex += 1;
        } else {
            res.push(null);
        }
        i++;
    }
    return res;
}
