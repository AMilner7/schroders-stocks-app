import React from 'react';
import SearchStock from './components/SearchStock';
import DateSelectTile from './components/SelectDateRange';
import StockTable from './components/StockTable';
import StockGraph from './components/StockGraph';
import './App.css';
import SelectPriceType from './components/SelectPriceType';

export default function App() {
  const [startDate, setStartDate] = React.useState(new Date().getTime());
  const [endDate, setEndDate] = React.useState(startDate);
  const [stockData, setStockData] = React.useState({});
  const [selectedStocks, setSelectedStocks] = React.useState(new Set());
  const [priceType, setPriceType] = React.useState('close');

  console.log(stockData)

  return (
    <div>
      <SearchStock
        startDate = {startDate}
        endDate = {endDate}
        setStockData = {setStockData}
        stockData = {stockData}
        selectedStocks = {selectedStocks}
      />
      <SelectPriceType
        priceType = {priceType}
        setPriceType = {setPriceType}
      />
      <DateSelectTile
        startDate = {startDate}
        endDate = {endDate}
        setEndDate = {setEndDate}
        setStartDate = {setStartDate}
      />
      <StockTable
        stockData = {stockData}
        setStockData = {setStockData}
        selectedStocks = {selectedStocks}
        setSelectedStocks = {setSelectedStocks}
      />
      <StockGraph
        stockData = {stockData}
        selectedStocks = {selectedStocks}
        priceType = {priceType}
      />
    </div>
  )
}
