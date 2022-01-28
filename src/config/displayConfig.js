export const tableColumns = [
  {
    name: "Symbol",
    selector: "id",
  },
  {
    name: "Name",
    selector: "name",
  },
  {
    name: 'Currency',
    selector: 'currency',
  },
  {
    name: 'Industry',
    selector: 'industry',
  },
  {
    name: 'Exchange',
    selector: 'exchange',
  }
];

export const conditionalRowStyles = [
  {
    when: (row) => row.toggleSelected,
    style: {
      backgroundColor: "green",
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
    title: {
      display: true,
      text: 'Stock Prices',
    },
  },
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