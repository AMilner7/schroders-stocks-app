export const defaultSearchTitle = 'Search for Stock';

export const tableColumns = [
  {
    name: "Symbol",
    selector: "id",
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'Currency',
    selector: 'currency',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Industry',
    selector: 'industry',
    sortable: true,
    width: '20%'
  },
  {
    name: 'Exchange',
    selector: 'exchange',
    sortable: true,
    width: '30%'
  }
];

export const conditionalRowStyles = [
  {
    when: (row) => row.toggleSelected,
    style: {
      backgroundColor: "#32a852",
      userSelect: "none"
    }
  }
];

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  text: {
    primary: '#d5e6ed',
  }
    // title: {
    //   display: true,
    //   text: 'Stock Prices (USD)',
    // },
};

export const lineColors = [
  {
      color: 'g',
      line: '#da534d',
      border: '#faa39f',
  },
  {
      color: 'b',
      line: '#007790',
      border: '#69dbf1',
  },
  {
      color: 'r',
      line: '#009872',
      border: '#69f2d0',
  },
  {
      color: 'y',
      line: '#F1C232',
      border: '#FFD966',
  }
]

export const customRowStyles = {
  rows: {
      style: {
          maxHeight: '72px',
          backgroundColor: '#d5e6ed'
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px',
          paddingRight: '8px',
      },
  },
  cells: {
      style: {

          paddingRight: '8px',
      },
  },
};