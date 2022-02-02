/**
 * Returns date of date string.
 * @param {string} dateString
 * @returns Date as DD-MM-YYYY
 */
export function getDate(dateString) {
    const date = new Date(dateString);
    const dd = getPaddedTime(date.getDate());
    const mm = date.toLocaleDateString('default', { month: 'short' });
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

/**
 * Add leading 0 to display times.
 * @param {number} time - Time to add padding
 * @returns Padded display time
 */
function getPaddedTime(time) {
    return (time < 10 ? '0' : '') + time;
}

/**
 * Returns date time stamp for finnhub search format.
 * @param {number} dateTime - UNIX timestamp
 * @returns Date time stamp for finnhub
 */
export function getSearchTime(dateTime) {
    return Math.round(dateTime / 1000);
}

/**
 * Return number of days between start and end dates.
 * @param {number} startDate - Start date
 * @param {number} endDate - End date
 * @returns Days inbetween
 */
export function getDayRange(startDate, endDate) {
    return Math.round((endDate - startDate) / (24 * 60 * 60 * 1000));
}
