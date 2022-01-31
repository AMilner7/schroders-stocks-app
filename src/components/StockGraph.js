import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDate } from '../utils/dateUtil';
import {
    chartOptions,
    graphTitle,
    lineColors,
    noGraphDefaultMessage,
} from '../config/displayConfig';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { centerAlignment, greyBox } from '../config/styleConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockGraph(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        /**
         * Get data timeseries labels for display stocks.
         * @returns Timeseries labels
         */
        function getLabels() {
            let timeRange = new Set();
            props.selectedStocks.forEach((symbol) => {
                const stock = props.stockData[symbol];
                timeRange.add(stock.prices.timeStamps);
            });
            return [...timeRange][0].sort().map((time) => getDate(time));
        }

        /**
         * Get data sets of stock to display in graph.
         * @returns Datasets to display.
         */
        function getDataSets() {
            return [...props.selectedStocks].map((symbol, i) => {
                const stock = props.stockData[symbol];
                const color = lineColors[i];
                return {
                    data: stock.prices[props.priceType],
                    borderColor: color.border,
                    backgroundColor: color.line,
                    label: `${stock.profile.name} (${symbol})`,
                };
            });
        }
        if (props.selectedStocks.size) {
            setData({ labels: getLabels(), datasets: getDataSets() });
        } else {
            setData(null);
        }
    }, [props]);

    return data === null ? (
        <Grid sx={centerAlignment}>
            <Box sx={greyBox}>{noGraphDefaultMessage}</Box>
        </Grid>
    ) : (
        <Grid
            sx={{
                ...centerAlignment,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ ...greyBox, height: '10%' }}>{graphTitle}</Box>
            <Line style={{ marginLeft: '3%' }} height="100%" options={chartOptions} data={data} />
        </Grid>
    );
}
