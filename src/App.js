import React from 'react';
import SearchStock from './components/SearchStock';
import DateSelectTile from './components/SelectDateRange';
import StockTable from './components/StockTable';
import StockGraph from './components/StockGraph';
import './App.css';
import SelectPriceType from './components/SelectPriceType';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// // export default function BasicStack() {
// //   return (
// //     <div>
// //       <Stack spacing={2}>
// //         <Item>Item 1</Item>
// //         <Item>Item 2</Item>
// //         <Item>Item 3</Item>
// //       </Stack>
// //     </div>
// //   );
// // }
// const gridItem = {
//   margin: "8px",
//   border: "1px solid red"
// };

// export default function App() {
//   return (
//     <div>
//       <Box sx={{ width: "100%" }}>
//         <Box>
//           <Grid item xs={4}>
//             <Stack spacing={2}>
//               <Item>Search</Item>
//               <Item>Search</Item>
//             </Stack>
//           </Grid>
//           <Grid item xs={8} sx={gridItem}>
//             <Item>Top Table</Item>
//           </Grid>
//           <Grid item xs={12}>
//             <Item>Graph</Item>
//           </Grid>
        
//       </Box>
//     </div>
//   );
// }




export default function App() {
  const [startDate, setStartDate] = React.useState(new Date().getTime());
  const [endDate, setEndDate] = React.useState(startDate);
  const [stockData, setStockData] = React.useState({});
  const [selectedStocks, setSelectedStocks] = React.useState(new Set());
  const [priceType, setPriceType] = React.useState('close');

  console.log(stockData)

  return (
    <div id="main">
      <div>
      <Paper variant="outlined">
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
        </Paper>
      </div>
      <div>
          <Paper variant="outlined">
          <StockTable
              stockData = {stockData}
              setStockData = {setStockData}
              selectedStocks = {selectedStocks}
              setSelectedStocks = {setSelectedStocks}
          />
              </Paper>
    
      </div>
    </div>
    

  //   <StockGraph
  //   stockData = {stockData}
  //   selectedStocks = {selectedStocks}
  //   priceType = {priceType}
  // />
  )
}
