import { Box, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import toast, { Toaster } from 'react-hot-toast';
import {
    conditionalRowStyles,
    customRowStyles,
    noTableDefaultMessage,
    tableColumns,
} from '../config/displayConfig';
import { maxDisplayMessage, noSelectedStocksToDeleteMessage } from '../config/messageConfig';
import { buttonDefaults, centerAlignment, greyBox, red } from '../config/styleConfig';

export default function StockTable(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(
            Object.values(props.stockData).map((stock) => {
                return {
                    ...stock.profile,
                    toggleSelected: stock.toggleSelected,
                };
            })
        );
    }, [props.stockData]);

    /**
     * Toggle stock selection for data table and graph displays.
     * @param {any} row - Selected row
     */
    function handleRowClicked(row) {
        let selectedStocks = new Set();
        const updatedData = { ...props.stockData };
        updateSelectedRow(row, updatedData, selectedStocks);
        if (selectedStocks.size > 3) {
            toast(maxDisplayMessage);
        } else {
            props.setSelectedStocks(selectedStocks);
        }
        props.setStockData(updatedData);
    }

    /**
     * Updates selected row toggle.
     * @param {any} row - Selected row
     * @param {any} updatedData - Row data to be updated
     * @param {Set} selectedStocks - Current selected stocks
     */
    function updateSelectedRow(row, updatedData, selectedStocks) {
        Object.keys(props.stockData).forEach((symbol) => {
            const stock = props.stockData[symbol];
            let toggleSelected = stock.toggleSelected;
            if (row.id === stock.profile.id) {
                toggleSelected = !stock.toggleSelected;
            }
            if (toggleSelected) {
                selectedStocks.add(stock.profile.id);
            } else {
                selectedStocks.delete(stock.profile.id);
            }
            updatedData[symbol] = { ...stock, toggleSelected };
        });
    }

    /**
     * Delete selected rows amd update stockData.
     */
    function deleteRows() {
        let updatedStockData = Object.assign({}, props.stockData);
        if (props.selectedStocks.size) {
            [...props.selectedStocks].forEach((symbol) => delete updatedStockData[symbol]);
            props.setStockData({ ...updatedStockData });
            props.setSelectedStocks(new Set());
        } else {
            toast(noSelectedStocksToDeleteMessage);
        }
    }

    return Object.keys(props.stockData).length ? (
        <Box sx={{ width: '100%' }}>
            <Button
                key="delete-button"
                size="small"
                onClick={deleteRows}
                sx={{
                    ...buttonDefaults,
                    backgroundColor: red,
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
                fixedHeaderScrollHeight="200px"
                overflowY="hidden"
                customStyles={customRowStyles}
                conditionalRowStyles={conditionalRowStyles}
            />
            <Toaster />
        </Box>
    ) : (
        <Grid sx={centerAlignment}>
            <Box sx={greyBox}>{noTableDefaultMessage}</Box>
        </Grid>
    );
}
