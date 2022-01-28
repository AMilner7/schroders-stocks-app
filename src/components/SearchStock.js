import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { noStockPricesMessage, noStockProfileMessage } from '../config/messageConfig';
import { getStockPrices, getStockProfile } from '../utils/finnhubUtil';

export default function SearchStock(props) {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    useEffect(() => {
        if (props.startDate !== startDate || props.endDate !== endDate) {
            const newTimeData = updateStockTimes();
            newTimeData.then((data) => props.setStockData({ ...data }))
        }
    })

    async function updateStockTimes() {
        let newTimeData = {}
        for (let i = 0; i < Object.keys(props.stockData).length; i++) {
            const updatedData = await updateStockPrices(Object.values(props.stockData)[i].profile, false);
            newTimeData = {...newTimeData, ...updatedData};
        }
        return newTimeData;
    }

    async function getStock() {
        const symbol = document.querySelector('.textbox-search').value.toUpperCase();
        const stockProfile = await getStockProfile(symbol);
        if (!stockProfile) {
            toast(noStockProfileMessage);
        } else {
            return updateStockPrices(stockProfile);
        }
    }

    async function updateStockPrices(stockProfile, isSingleCall = true) {
        setStartDate(props.startDate);
        setEndDate(props.endDate);
        const stockPrices = await getStockPrices(stockProfile.id, props.startDate, props.endDate);
        if (!stockProfile) {
            toast(noStockPricesMessage);
        } else {
            const stockData = {}
            stockData[stockProfile.id] = { profile: { ...stockProfile }, prices: { ...stockPrices } };
            if (isSingleCall) {
                props.setStockData({...props.stockData, ...stockData});
            }
            return stockData;
        }
    }

    function checkCanClickButton(typedValue) {
        let searchButton = document.querySelector('.button-search');;
        if (!typedValue || typedValue.length > 4) {
            searchButton.disabled = true;
        } else {
            searchButton.disabled = false;
        }
    }

    return (
        <div>
            <h2>Search for Stock</h2>
            <input
                className='form-control textbox-search'
                type='text'
                placeholder='Stock Code (eg: MSFT)'
                onKeyUp={(event) => checkCanClickButton(event.target.value)}
            />
            <button
                className='button-search'
                onClick={() => getStock()}
            >Search</button>
            <Toaster />
        </div>
    )
}