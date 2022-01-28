/**
 * Returns date of date string.
 * @param {string} dateString 
 * @returns Date as DD-MM-YYYY
 */
 export function getDate(dateString) {
    const date = new Date(dateString);
    const dd = date.getDate();
    const mm = date.toLocaleDateString('default', { month: 'short' });
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

/**
 * Returns date time stamp for finnhub search format.
 * @param {number} dateTime - UNIX timestamp
 * @returns Date time stamp for finnhub
 */
export function getSearchTime(dateTime) {
    return Math.round(dateTime / 1000);
}
