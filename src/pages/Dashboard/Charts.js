import React, { useEffect, useMemo, useState } from "react"
import { Chart } from "react-charts"
import { Row, Col } from "reactstrap"
import "./styles.css"
import api from "services/Api"

function MyChart() {
  const [incomeData, setIncomeData] = useState([])
  const [expensesData, setExpensesData] = useState([])

  useEffect(()=> {
    getYearlyIncome();
  }, [])

  const getYearlyIncome = async() => {
    try {
      const response = await api.getyearlyincome()
      const data = response.data
      setIncomeData(data.map(item => ({ x: item.month, y: item.income_total })))
      setExpensesData(data.map(item => ({ x: item.month, y: item.expenses_total })))
    } catch (error) {
      console.error('Error fetching yearly income:', error)
    }
  }

  const axes = useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom", show: true },
      { type: "linear", position: "left", id: "y-axis", min: 0, max: 100000 },
    ],
    []
  )

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
