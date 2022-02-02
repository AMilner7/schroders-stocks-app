import { darkBlue, green, grey, red } from './styleConfig';

export const defaultSearchTitle = 'Search for Stock';

export const inputTextPrompt = 'Search for Stock (eg: MSFT)';

export const tableColumns = [
    {
        name: 'Symbol',
        selector: 'id',
        sortable: true,
        maxWidth: '10%',
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
        maxWidth: '30%',
    },
    {
        name: 'Currency',
        selector: 'currency',
        sortable: true,
        maxWidth: '10%',
    },
    {
        name: 'Industry',
        selector: 'industry',
        sortable: true,
        width: '20%',
    },
    {
        name: 'Exchange',
        selector: 'exchange',
        sortable: true,
        width: '30%',
    },
];

export const conditionalRowStyles = [
    {
        when: (row) => row.toggleSelected,
        style: {
            backgroundColor: green,
            userSelect: 'none',
        },
    },
];

export const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

export const lineColors = [
    {
        line: red,
        border: red,
    },
    {
        line: green,
        border: green,
    },
    {
        line: darkBlue,
        border: darkBlue,
    },
];

export const customRowStyles = {
    rows: {
        style: {
            maxHeight: '72px',
            backgroundColor: grey,
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingRight: '8px',
        },
    },
};

export const graphTitle = 'Stock Prices (USD)';

export const noGraphDefaultMessage = 'No stocks selected from table to display.';

export const noTableDefaultMessage = 'No stocks added to table.';
