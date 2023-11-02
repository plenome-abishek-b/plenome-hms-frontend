import React from 'react';
import { Bar } from "react-chartjs-2";

const Barchart = () => {

  return (
    
<div className="App">
      <h1>Monthly Income Overview</h1>
      <div style={{ width: "500px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["Outpatient Income", "Inpatient Income", "Pharmacy Income", "Pathology income" , "Radiology Income" , "Blood Bank Income" , "Ambulance Income" , "General Income" , "Expenses"],
            datasets: [
              {
                // Label for bars
                label: "Income",
                // Data or value of your each variable
                data: [25000, 15000, 50000 , 25000, 20000, 10000, 14000 , 80000 ,25000],
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow" , "orange", "salmon", "violet", "pink" , "teal" ],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow", "orange", "salmon", "violet", "pink" , "teal"],
                borderWidth: 0.25,
              },
            ],
          }}
          // Height of graph
          height={375}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>

  )
}

export default Barchart;