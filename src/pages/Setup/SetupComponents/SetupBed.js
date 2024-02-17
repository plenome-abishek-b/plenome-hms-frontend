import PropTypes from "prop-types"
import React ,{useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"
//redux

const SetupBed = props => {

  const [tableData,setTableData] = useState()

  // const rowData = [
  //   {name: 'GS-101', type: 'Standard', group: 'VIP Ward', floor: 'Ground Floor', status: 'Available'}
  // ]

  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Bed Type', field: 'bed_type_name'},
    {headerName: 'Bed Group', field: 'bed_group_name'},
    {headerName: 'Floor', field: 'floor_name'},
    {headerName: 'Status', field: 'is_active_flag'}
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
    getBedStatusList()
  }, [])

  const getBedStatusList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getBedStatusSetup().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Bed Status</h4>
          <Card>
            <CardBody>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, marginTop: "20px" }}
              >
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

export default withTranslation()(SetupBed)