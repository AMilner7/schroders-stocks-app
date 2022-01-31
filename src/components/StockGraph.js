import React, { useEffect } from 'react';
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
import { chartOptions, lineColors } from '../config/displayConfig';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockGraph(props) {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    function getLabels() {
      let timeRange = new Set();
      props.selectedStocks.forEach((symbol) => {
          const stock = props.stockData[symbol];
          timeRange.add(stock.prices.timeStamps);
      })
      const labels = [...timeRange][0].sort().map((time) => getDate(time));
      console.log(labels)
      return labels
    }

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
      setData({ labels: getLabels(props), datasets: getDataSets(props) })
    } else {
      setData(null)
    }
  }, [props])

  return (
    data === null ?
    <Grid sx={{alignItems:'center', justifyContent:"center", display: 'flex'}}>
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
      >No stocks selected from table to display.</Box>
    </Grid>
    :  <Grid sx={{alignItems:'center', justifyContent:"flex-start", display: 'flex', flexDirection: 'column'}}>
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
            height: '10%'
          }}
        >Stock Prices (USD)</Box>
        <Line style={{'margin-left': '3%'}} height='100%' options={chartOptions} data={data} />
      </Grid>
    
  );
}
