import { Box, TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { inputTooLongMessage, noStockPricesMessage, noStockProfileMessage, onlyWordCharactersMessage } from '../config/messageConfig';
import { getStockPrices, getStockProfile } from '../utils/finnhubUtil';
import Typography from '@mui/material/Typography';

export default function SearchStock(props) {
    const [inputError, setInputError] = React.useState(false);
    const [helperText, setHelperText] = React.useState(null);
    const [searchStartDate, setSearchStartDate] = React.useState(props.startDate);
    const [searchEndDate, setSearchEndDate] = React.useState(props.endDate);

    const updateStockPrices = useCallback(async (symbol, stockProfile) => {
        const stockPrices = await getStockPrices(symbol, props.startDate, props.endDate);
        if (!stockPrices) {
            toast(noStockPricesMessage);
        } else {
            const newStockData = { ...props.stockData }
            if (stockProfile) {
                newStockData[symbol] = { profile: { ...stockProfile } }
            }
            newStockData[symbol].prices = { ...stockPrices };
            props.setStockData(newStockData);
            return newStockData;
        }
    }, [props])
    
    useEffect(() => {
        if (props.startDate !== searchStartDate || props.endDate !== searchEndDate) {
            setSearchStartDate(props.startDate);
            setSearchEndDate(props.endDate);
            Object.keys(props.stockData).forEach((symbol) => updateStockPrices(symbol))
        }
    }, [searchStartDate, searchEndDate, setSearchStartDate, setSearchEndDate, props, updateStockPrices])

    async function updateStockProfile(symbol) {
        const stockProfile = await getStockProfile(symbol);
        if (!stockProfile) {
            toast(noStockProfileMessage);
        } else {
            const newStockData = { ...props.stockData };
            newStockData[symbol] = { profile: { ...stockProfile}, prices: {} }
            return updateStockPrices(symbol, stockProfile);
        }
    }

    function handleChange(event) {
        if (/\W/.test(event.target.value)) {
            setHelperText(onlyWordCharactersMessage)
            setInputError(true);
        } else if (event.target.value.length > 4) {
            setHelperText(inputTooLongMessage)
            setInputError(true);
        } else {
            setHelperText(null);
            setInputError(false);
        }
    }

    function handleSearch(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            updateStockProfile(String(event.target.value).toUpperCase());
        }
    }

    return (
        <div style={{padding: '10px'}}>
            <Box
                component='form'
                sx={{'& > :not(style)': { m: 1, width: '25ch'}}}
                noValidate
                autoComplete='off'
                >
                    <Typography style={{paddingLeft: '20px', margin: '0px'}}>Select your stock:</Typography>
                    <TextField
                    id='outlined-basic'
                    label='Stock Code (eg: MSFT)'
                    variant='outlined'
                    helperText={helperText}
                    error={inputError}
                    onChange={handleChange}
                    onKeyDown={handleSearch}
                    inputProps={{ style: { textTransform: 'uppercase' }}}
                />
            </Box>
            <Toaster />
        </div>
    )
}