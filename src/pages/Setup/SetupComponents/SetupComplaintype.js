import PropTypes from "prop-types"
import React, { useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupComplainDialog from "../SetupDialog/SetupComplainDialog"
import api from "services/Api"

const setupFrontOfficeComplainType = props => {

  const initialFrontofficeSetupComplainTypeValue = {
    complaint_type: "",
    description: "",
    created_at: "2023-02-02 11:11:11"
      }


  const [opencomplainDialog, setOpenComplainDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialFrontofficeSetupComplainTypeValue)


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


  // const rowData = [
  //   {
  //     cmptype: " Charges",
  //     description: "others",
  //     action: "",
  //   },
  // ]

  const columnDefs = [
    { headerName: "Complain Type", field: "complaint_type" },
    { headerName: "Description", field: "description" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenComplain = () => {
    setOpenComplainDialog(true)
  }

  const handleCloseComplain = () => {
    setOpenComplainDialog(false)
  }


  useEffect(() => {
    // getUsers from json
    getFrontSetupComplainType()
  }, [])

  const getFrontSetupComplainType = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getFrontofficeSetupComplainType().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  function patientId(e){
    console.log(e.target.value,"nameeeeeeeeeeee")
    const patientId = e.target.value;
    setId(patientId);
  }

  function handleFormSubmit(event) {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    api.postFrontofficeSetupComplainType(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });
  
    api
      .getFrontofficeSetupComplainType({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getFrontSetupComplainType();
        setFormData(initialFrontofficeSetupComplainTypeValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Complain Type List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenComplain}>
                    <i className="fa fa-plus"></i>&nbsp; Add Complaint Type
                  </button>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 700, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                  <SetupComplainDialog open={opencomplainDialog} handleClose={handleCloseComplain} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFrontOfficeComplainType)
