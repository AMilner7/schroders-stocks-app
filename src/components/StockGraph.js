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
import '../styles/GraphStyles.css';

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
    <div>
      {data === null ?
        <p>No stocks to display.</p> :
        <Line options={chartOptions} data={data}/>}
    </div>
  );
}
