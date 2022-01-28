import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import { conditionalRowStyles, tableColumns } from '../config/displayConfig';
import { maxDisplayMessage, noSelectedStocksToDeleteMessage } from '../config/messageConfig';

export default function StockTable(props) {
  const [data, setData] = React.useState([]);
  
  useEffect(() => {
      setData(Object.values(props.stockData).map((stock) => {
        return {
          ...stock.profile,
          toggleSelected: stock.toggleSelected
        }
      }));
  }, [props.stockData])

  function handleRowClicked(row) {
    let selectedStocks = new Set();
    const updatedData = { ...props.stockData };
    Object.keys(props.stockData).forEach((symbol) => {
      const stock = props.stockData[symbol];
      let toggleSelected = stock.toggleSelected;
      if (row.id === stock.profile.id) {
        toggleSelected = !stock.toggleSelected;
      }
      if (toggleSelected) {
        selectedStocks.add(stock.profile.id)
      } else {
        selectedStocks.delete(stock.profile.id)
      }
      updatedData[symbol] = { ...stock, toggleSelected };
    })
    if (selectedStocks.size > 3) {
      toast(maxDisplayMessage);
    } else {
      props.setSelectedStocks(selectedStocks);
    }
    props.setStockData(updatedData);
  };

  function deleteRows() {
    let updatedStockData = Object.assign({}, props.stockData);
    if (props.selectedStocks.size) {
      [...props.selectedStocks].forEach((symbol) => delete updatedStockData[symbol])
      props.setStockData({...updatedStockData})
      props.setSelectedStocks(new Set())
    } else {
      toast(noSelectedStocksToDeleteMessage);
    }
  }

  return (
    <div>
      {Object.keys(props.stockData).length ?
      <div>
        <Button
          key='delete-button'
          variant='contained'
          onClick={deleteRows}
        >Delete Selected Rows</Button>
        <DataTable
          title="Available Stocks"
          columns={tableColumns}
          highlightOnHover
          data={data}
          onRowClicked={handleRowClicked}
          sort
          conditionalRowStyles={conditionalRowStyles}
        />
        <Toaster />
      </div> : <h2>No stocks added.</h2>}
    </div>
  );
}
