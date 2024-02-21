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
    {headerName: 'Bed Type', field: 'bed_type'},
    {headerName: 'Bed Group', field: 'bed_group'},
    {headerName: 'Floor', field: 'floor'},
    {headerName: 'Status', field: 'status'}
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
    getBedStatus()
  }, [])

  const getBedStatus = async () => {
    const response = await api?.getSetup_bed_Status()
    const {data} = response;
    console.log(data,"log-data");
    setTableData(data)
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