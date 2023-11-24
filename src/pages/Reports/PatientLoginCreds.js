import PropTypes from "prop-types"
import React,{useMemo, useEffect, useState} from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"

const Patientlogincreds = props => {
    const [tableData, setTableData] = useState(null)

    const columnDefs = [
        {headerName: 'Patient ID', field: 'patient_id'},
        {headerName: 'Patient Name',field: 'patient_name'},
        {headerName: 'Username', field: 'username'},
        {headerName: 'Password', field: 'password'}
      ]
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      )

      useEffect(() => {
        // getUsers from json
        getPatientCreds()
      }, [])

      const getPatientCreds = () => {
        api.getPatientCredsReport().then(res => setTableData(res.data))
        api.http
      }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Patient Login Credential</h4>
          <div className="ag-theme-alpine mt-2" style={{ height: 400 }}>
            <AgGridReact
            rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Patientlogincreds)