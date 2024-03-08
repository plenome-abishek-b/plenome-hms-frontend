import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useMedia } from 'react-use';
import api from 'services/Api';

function Piechart() {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    getMonthlyData();
  }, []);

  const getMonthlyData = async () => {
    try {
      const response = await api.getyearlyincome();
      setMonthlyData(response.data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  console.log(monthlyData,'monthdata');

  const incomeData = monthlyData.map(item => item.income_total);
  const labels = monthlyData.map(item => item.month);

  const data = React.useMemo(() => ({
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: [
          '#4E4FEB', // Color for the income slices
          '#28a745',
          '#FFA41B',
          '#ED2B2A',
          '#7149C6',
          '#FF6666',
          '#FF6000',
          '#4E4FEB',
          '#28a745',
          '#FFA41B',
          '#ED2B2A',
          '#7149C6',
        ].slice(0, monthlyData.length), // Adjust the number of colors based on the number of months
      },
    ],
  }), [incomeData, labels, monthlyData]);

  const options = React.useMemo(() => ({
    maintainAspectRatio: false,
    responsive: true,
    circumference: Math.PI, // Set the circumference to PI (180 degrees) to create a half-circle effect
    rotation: 2 * Math.PI / 2, // Rotate the chart to start from the left side
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
