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
