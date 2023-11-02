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

const AudittrailReport = props => {
  const [tableData, setTableData] = useState(null)
    const columnDefs = [
        {headerName: 'Message', field: 'message'},
        {headerName: 'Users', field: 'users'},
        {headerName: 'IP Address', field: 'ip_address'},
        {headerName: 'Action', field: 'action'},
        {headerName: 'Platform', field: 'platform'},
        {headerName: 'Agent', field: 'agent'},
       {headerName: 'Date Time', field: 'time'},
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
        getAuditTrail()
      },[])
        const getAuditTrail = async () =>{
          const response = await api.getAuditTrailReport()
          const {data} = response
          console.log(data, 'dddddd')
          setTableData(data)
        }
    
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Audit Trail Report</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Delete All</button>
            </div>
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

export default withTranslation()(AudittrailReport)