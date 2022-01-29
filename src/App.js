import React from 'react';
import SearchStock from './components/SearchStock';
import DateSelectTile from './components/SelectDateRange';
import StockTable from './components/StockTable';
import StockGraph from './components/StockGraph';
import SelectPriceType from './components/SelectPriceType';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function App() {
  const [startDate, setStartDate] = React.useState(new Date().getTime());
  const [endDate, setEndDate] = React.useState(startDate);
  const [stockData, setStockData] = React.useState({});
  const [selectedStocks, setSelectedStocks] = React.useState(new Set());
  const [priceType, setPriceType] = React.useState('close');

  console.log(stockData)

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Box sx={{ height: 300 }}>
            <Box sx={{height: 100, width: 350, backgroundColor: 'primary.light'}}>
              <SearchStock 
                startDate = {startDate}
                endDate = {endDate}
                setStockData = {setStockData}
                stockData = {stockData}
                selectedStocks = {selectedStocks}
              />
            </Box>
            <Box sx={{height: 200, width: 350, backgroundColor: 'primary.main'}}>
              <DateSelectTile
                startDate = {startDate}
                endDate = {endDate}
                setEndDate = {setEndDate}
                setStartDate = {setStartDate}
              />
            </Box>
          </Box>
          <Box sx={{height: 300, width: 130, backgroundColor: 'primary.main'}}>
            <SelectPriceType
              priceType = {priceType}
              setPriceType = {setPriceType}
            />
          </Box>
          <Box sx={{height: 300, width: 700, backgroundColor: 'primary.main'}}>
            <StockTable
              stockData = {stockData}
              setStockData = {setStockData}
              selectedStocks = {selectedStocks}
              setSelectedStocks = {setSelectedStocks}
            />
          </Box>
        </Grid>
        <Box
          sx={{
            height: 500,
            backgroundColor: 'primary.light',
          }}>
          <StockGraph
            stockData = {stockData}
            selectedStocks = {selectedStocks}
            priceType = {priceType}
          />
        </Box>
      </Grid>
    </div>
  )
}
