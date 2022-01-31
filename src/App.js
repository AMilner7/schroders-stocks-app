import React from 'react';
import SearchStock from './components/SearchStock';
import DateSelectTile from './components/SelectDateRange';
import StockTable from './components/StockTable';
import StockGraph from './components/StockGraph';
import SelectPriceType from './components/SelectPriceType';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function App() {
    const [endDate, setEndDate] = React.useState(new Date().getTime());
    const [startDate, setStartDate] = React.useState(endDate - 4 * 24 * 60 * 60 * 1000);

    const [stockData, setStockData] = React.useState({});
    const [selectedStocks, setSelectedStocks] = React.useState(new Set());
    const [priceType, setPriceType] = React.useState('close');

    console.log(stockData);

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                margin="10px"
            >
                <Grid container direction="row" alignItems="stretch" sx={{ width: '90%' }}>
                    <Box sx={{ width: '30%' }}>
                        <Box sx={{ height: '33%', width: '100%' }}>
                            <SearchStock
                                startDate={startDate}
                                endDate={endDate}
                                setStockData={setStockData}
                                stockData={stockData}
                                selectedStocks={selectedStocks}
                            />
                        </Box>
                        <Box sx={{ height: '67%', width: '100%' }}>
                            <DateSelectTile
                                startDate={startDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                setStartDate={setStartDate}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '10%' }}>
                        <SelectPriceType priceType={priceType} setPriceType={setPriceType} />
                    </Box>
                    <Box sx={{ width: '60%' }}>
                        <StockTable
                            stockData={stockData}
                            setStockData={setStockData}
                            selectedStocks={selectedStocks}
                            setSelectedStocks={setSelectedStocks}
                        />
                    </Box>
                </Grid>
                <Box sx={{ marginTop: '10px', width: '90%', height: '100%' }}>
                    <StockGraph
                        stockData={stockData}
                        selectedStocks={selectedStocks}
                        priceType={priceType}
                    />
                </Box>
            </Grid>
        </div>
    );
}
