import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useMedia } from 'react-use';

function Piechart() {
  const isWide = useMedia('(min-width: 768px)'); // Adjust breakpoint as needed

    const data = React.useMemo(() => ({
        labels: ['OPD Income', 'IPD Income', 'Pharmacy Income', 'Pathology Income', 'Radiology Income','Ambulance Income', 'Blood Bank Income'],
        datasets: [
          {
            label: 'Income',
            data: [1200, 900, 2000, 1000, 2200, 950, 800],
            backgroundColor: [
              '#4E4FEB', // Color for the income slices
              '#28a745',
              '#FFA41B',
              '#ED2B2A',
              '#7149C6',
              '#FF6666',
              '#FF6000'
            ],
          },
        ],
      }), []);
    
      const options = React.useMemo(() => ({
        maintainAspectRatio: false,
        responsive: true,
        circumference: Math.PI, // Set the circumference to PI (180 degrees) to create a half-circle effect
        rotation: 2*Math.PI / 2, // Rotate the chart to start from the left side
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      }), []);
    
     const chartStyle = {
    width: '100%',
    height: '400px',
    margin: '0 auto'
  };

  return (
    <div style={chartStyle}>
       <Doughnut data={data} options={options} />
    </div>
  );
}

export default Piechart;
