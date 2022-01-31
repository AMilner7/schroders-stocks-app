import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    inputTooLongMessage,
    noStockPricesMessage,
    noStockProfileMessage,
    noValueToSearch,
    onlyWordCharactersMessage,
} from '../config/messageConfig';
import { getStockPrices, getStockProfile } from '../utils/finnhubUtil';

export default function SearchStock(props) {
    const [inputError, setInputError] = useState(false);
    const [helperText, setHelperText] = useState(null);
    const [searchStartDate, setSearchStartDate] = useState(props.startDate);
    const [searchEndDate, setSearchEndDate] = useState(props.endDate);
    const [userInput, setUserInput] = useState('');
    const updateStockPrices = useCallback(
        /**
         * Updates stockData for new date range selection.
         * @param {string} symbol - Stock symbol
         * @param {any} stockProfile - Stock profile data
         * @returns Updated stock data
         */
        async (symbol, stockProfile) => {
            const stockPrices = await getStockPrices(symbol, props.startDate, props.endDate);
            if (!stockPrices) {
                toast(noStockPricesMessage);
            } else {
                const newStockData = { ...props.stockData };
                if (stockProfile) {
                    newStockData[symbol] = { profile: { ...stockProfile } };
                }
                newStockData[symbol].prices = { ...stockPrices };
                props.setStockData(newStockData);
                return newStockData;
            }
        },
        [props]
    );

    useEffect(() => {
        if (props.startDate !== searchStartDate || props.endDate !== searchEndDate) {
            setSearchStartDate(props.startDate);
            setSearchEndDate(props.endDate);
            Object.keys(props.stockData).forEach((symbol) => updateStockPrices(symbol));
        }
    }, [
        searchStartDate,
        searchEndDate,
        setSearchStartDate,
        setSearchEndDate,
        props,
        updateStockPrices,
    ]);

    /**
     * Update stock prices for selected date range.
     * @param {string} symbol - Stock symbol
     * @returns Updated stock prices and profile data
     */
    async function updateStockProfile(symbol) {
        const stockProfile = await getStockProfile(symbol);
        if (!stockProfile) {
            toast(noStockProfileMessage);
        } else {
            const newStockData = { ...props.stockData };
            newStockData[symbol] = { profile: { ...stockProfile }, prices: {} };
            return updateStockPrices(symbol, stockProfile);
        }
    }

    /**
     * Validate user input can be used.
     * @param {KeyboardEvent} event - User input
     */
    function handleChange(event) {
        const inputText = String(event.target.value).toUpperCase();
        if (/\W/.test(inputText)) {
            setHelperText(onlyWordCharactersMessage);
            setInputError(true);
        } else if (inputText.length > 4) {
            setHelperText(inputTooLongMessage);
            setInputError(true);
        } else {
            setHelperText(null);
            setInputError(false);
        }
        if (!inputError) {
            setUserInput(inputText);
        }
    }

    /**
     * Trigger search when user presses enter.
     * @param {KeyboardEvent} event - User input
     */
    function handleSearch(event) {
        if (event.keyCode === 13) {
            if (!userInput) {
                toast(noValueToSearch);
            } else if (!inputError) {
                event.preventDefault();
                updateStockProfile(userInput);
            }
        }
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="flex-start">
                <Box sx={{ width: '75%', marginRight: '5%' }}>
                    <TextField
                        id="outlined-basic"
                        label="Search for Stock (eg: MSFT)"
                        variant="outlined"
                        helperText={helperText}
                        error={inputError}
                        onChange={handleChange}
                        onKeyDown={handleSearch}
                        inputProps={{ style: { textTransform: 'uppercase' } }}
                        sx={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ width: '20%' }}>
                    <Button
                        onClick={() => updateStockProfile(userInput)}
                        disabled={inputError}
                        key="search-button"
                        variant="contained"
                        sx={{
                            width: '100%',
                            backgroundColor: '#3287a8',
                            ':hover': {
                                bgcolor: '#1a4759',
                                color: 'white',
                            },
                        }}
                    >
                        SEARCH
                    </Button>
                </Box>
            </Grid>
            <Toaster />
        </div>
    );
}
