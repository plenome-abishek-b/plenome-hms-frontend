import PropTypes from "prop-types"
import React,{useMemo, useState, useEffect} from "react"
import { Card, CardBody, Container } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const InventorystockReport = props => {
  
  const [tableData,  setTableData ] = useState(null)
    const columnDefs = [
        {headerName: 'Name', field: 'name'},
        {headerName: 'Category', field: 'item_category'},
        {headerName: 'Supplier', field: 'item_supplier'},
        {headerName: 'Store', field: 'item_store'},
        {headerName: 'Total Quantity', field: 'totalQuantity'},
        {headerName: 'Total Issued', field: 'supplied'},
       {headerName: 'Available Quantity', field: 'remainingQuantity'},
]
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      )

      useEffect(()=>{
        getInventoryStock()
      },[])
        const getInventoryStock = async () =>{
          const response = await api.getInventoryStockReport()
          const {data} = response
          console.log(data, 'dddddd')
          setTableData(data)
        }
    
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Inventory Stock Report</h4>
          <Card>
            <CardBody>
            <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
            rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(InventorystockReport)