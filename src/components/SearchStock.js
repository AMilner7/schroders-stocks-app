import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
const { Toaster, toast } = require('react-hot-toast');
import { inputTextPrompt } from '../config/displayConfig';
import {
    inputTooLongMessage,
    noStockPricesMessage,
    noStockProfileMessage,
    noValueToSearch,
    onlyWordCharactersMessage,
} from '../config/messageConfig';
import { buttonDefaults, lightBlue } from '../config/styleConfig';
import { getStockPrices, getStockProfile } from '../utils/finnhubUtil';

export default function SearchStock(props) {
    const [inputError, setInputError] = useState(false);
    const [helperText, setHelperText] = useState(null);
    const [searchStartDate, setSearchStartDate] = useState(props.startDate);
    const [searchEndDate, setSearchEndDate] = useState(props.endDate);
    const [userInput, setUserInput] = useState('');
    const [stocksInDateRange, setStocksInDateRange] = useState(new Set());

    /**
     * Updates stockData for new date range selection.
     * @param {string} symbol - Stock symbol
     * @param {any} stockProfile - Stock profile data
     * @returns Updated stock data
     */
    const updateStockPrices = async (symbol, profile) => {
        const stockPrices = await getStockPrices(symbol, props.startDate, props.endDate);
        if (!stockPrices) {
            toast(noStockPricesMessage);
        } else {
            const newStockData = { ...props.stockData };
            if (profile) {
                newStockData[symbol] = { profile };
            }
            newStockData[symbol].prices = { ...stockPrices };
            props.setStockData(newStockData);
            return newStockData;
        }
    };

    useEffect(() => {
        if (props.startDate !== searchStartDate || props.endDate !== searchEndDate) {
            setStocksInDateRange(new Set());
            setSearchStartDate(props.startDate);
            setSearchEndDate(props.endDate);
        }
        if (props.selectedStocks.size) {
            [...props.selectedStocks].forEach((symbol) => {
                if (!stocksInDateRange.has(symbol)) {
                    stocksInDateRange.add(symbol);
                    updateStockPrices(symbol);
                }
            });
        }
    }, [searchStartDate, searchEndDate, props]);

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
        if (event.key === 'Enter') {
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
                        id="input-text"
                        label={inputTextPrompt}
                        variant="outlined"
                        helperText={helperText}
                        error={inputError}
                        onChange={handleChange}
                        onKeyDown={handleSearch}
                        inputProps={{ style: { textTransform: 'uppercase' } }}
                        sx={{ width: '100%' }}
                        data-testid="input-text"
                    />
                </Box>
                <Box sx={{ width: '20%' }}>
                    <Button
                        onClick={() => updateStockProfile(userInput)}
                        disabled={inputError || !userInput}
                        key="search-button"
                        variant="contained"
                        sx={{
                            width: '100%',
                            backgroundColor: lightBlue,
                            ...buttonDefaults,
                        }}
                        data-testid="search-button"
                    >
                        SEARCH
                    </Button>
                </Box>
            </Grid>
            <Toaster />
        </div>
    );
}
