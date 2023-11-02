import React, { useMemo } from "react"
import { Chart } from "react-charts"
import { Row, Col } from "reactstrap"
import "./styles.css"

function MyChart() {

  const axes = useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom", show: true },
      { type: "linear", position: "left", id: "y-axis", min: 0, max: 100000 },
    ],
    []
  )

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const incomeData = monthLabels.map((month, index) => ({
    x: month,
    y: Math.random() * 80000 + 20000,
  }))

  const expensesData = monthLabels.map((month, index) => ({
    x: month,
    y: Math.random() * 60000 + 30000,
  }))

  const combinedData = [
    {
      label: "Income",
      data: incomeData,
    },
    {
      label: "Expenses",
      data: expensesData,
    },
  ]

  const chartStyle = {
    width: "100%", // Set initial width to 100%
    height: "400px", // Set an initial height
    margin: "0 auto",
  }

  const series = useMemo(
    () => ({
      type: "line",
      style: {
        strokeWidth: 2,
      },
    }),
    []
  )

  const getSeriesStyle = series => ({
    color: series.label === "Income" ? "#4E4FEB" : "#28a745", // Green color for 'Expenses'
    strokeWidth: 2.5,
  })

  return (
    <Row>
      <Col>
        <div style={chartStyle} className="chart-container">
          <Chart
            data={combinedData}
            axes={axes}
            series={series}
            getSeriesStyle={getSeriesStyle}
            tooltip
          />
        </div>
      </Col>
    </Row>
  )
}

export default MyChart
