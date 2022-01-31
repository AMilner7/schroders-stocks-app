import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import { conditionalRowStyles, customRowStyles, tableColumns } from '../config/displayConfig';
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
      Object.keys(props.stockData).length ?
      <Box sx={{width:'100%'}}>
        <Button
          key='delete-button'
          size='small'
          onClick={deleteRows}
          sx={{height: '100%',
            backgroundColor: '#e81005',
            color: 'white',
            ':hover': {
              bgcolor: '#1a4759',
              color: 'white',
            }
          }}
        >
          Delete Selected Rows
        </Button>
          <DataTable
            columns={tableColumns}
            highlightOnHover
            data={data}
            onRowClicked={handleRowClicked}
            sort
            pointerOnHover
            dense
            fixedHeader
            fixedHeaderScrollHeight='200px'
            overflowY='hidden'
            customStyles={customRowStyles}
            conditionalRowStyles={conditionalRowStyles}
          />
        <Toaster />
      </Box> : <Grid sx={{alignItems:'center', justifyContent:"center", display: 'flex'}}>
      <Box
        sx={{
          m: 2,
          p: 1,
          display: 'inline-flex',
          color: 'black',
          border: '1px solid',
          borderColor: '#d5e6ed',
          backgroundColor: '#d5e6ed',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >No stocks added to table.</Box>
    </Grid>
  );
}
