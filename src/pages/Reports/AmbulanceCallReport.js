import PropTypes from "prop-types"
import React,{useMemo , useState , useEffect} from "react"
import { Card, CardBody, Container, Row, Col } from "reactstrap"
import api from "services/Api"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux

const Ambulancecallreport = props => {

  const [tableData, setTableData] = useState(null)
  console.log(tableData,'tabledata')

  const [collectedBy,setcollectedBy] = useState('')
  const [vehicleModel,setvehicleModel] = useState('')

  console.log(vehicleModel,'vm');

  useEffect(()=>{
    collected()
    vehicle()
    // handleBloodgroups()
  
  },[])
  
  const collected = async () =>{
    const response = await  api.getAmbulanceCollected()
    const {data} = response
    setcollectedBy(data)
    console.log(data,"data")
  }

  const vehicle = async () =>{
    const response = await  api.getAmbulanceVehicleModel()
    const {data} = response
    setvehicleModel(data)
    console.log(data,"data")
  }


  const columnDefs = [
    {headerName: 'Ambulance Call No', field: 'call_no'},
    {headerName: 'Patient Name', field: 'patient_name'},
    {headerName: 'Date', field: 'date'},
    {headerName: 'Contact No', field: 'mobileno'},
    {headerName: 'Vehicle Number', field: 'vehicle_no'},
    {headerName: 'Vehicle Model', field: 'vehicle_model'},
    {headerName: 'Driver Name', field: 'driver_name'},
    {headerName: 'Address', field: 'address'},
    {headerName: 'Amount', field: 'net_amount'},
    {headerName: 'Paid Amount', field: 'amount'},
    {headerName: 'Balance Amount', field: 'balance_amount'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const getAmbulancecall = async () => {
    const timeDuration = document.getElementById('timeDuration').value;
    const collectedBy = document.getElementById('collectedBy').value;
    const vehicleModel = document.getElementById('vehicleModel').value;

    const response = await api.getAmbulanceReport(timeDuration, collectedBy , vehicleModel);
    const { data } = response;
    console.log(data, 'Ambulance call report');
    setTableData(data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Card>
            <CardBody>
              <h4>Ambulance Call Report</h4>
              <Row>
                <Col lg="4">
                  <label>Time Duration</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="timeDuration" >
                    <option>select</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                    <option>Period</option>
                  </select>
                </Col>
                <Col lg="4" >
                  <label>Collected By</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="collectedBy" >
                    <option>select</option>
                    {collectedBy && collectedBy.map((collect) => (
                    <option key={collect.id} value={collect.id}>
                      {collect.name}
                    </option>
                  ))}
                  </select>
                </Col>
                <Col lg="4">
                  <label>Vehicle Model</label>
                  <br />
                  <select style={{ width: "100%", height: "30px", border: '1px solid grey', borderRadius: '5px' }} id="vehicleModel" >
                    <option>select </option>
                    {vehicleModel && vehicleModel.map((vehicleMod) => (
                    <option key={vehicleMod.id} value={vehicleMod.id}>
                      {vehicleMod.vehicle_model}
                    </option>
                  ))}
                  </select>
                </Col>
                
              </Row>
              <br />
                <div className="d-flex justify-content-end">
                  <button className="btn-mod" onClick={getAmbulancecall} >Search</button>
                </div>
            </CardBody>
          </Card>
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

export default withTranslation()(Ambulancecallreport)
