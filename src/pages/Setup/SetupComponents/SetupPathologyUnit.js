import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupPathologyUnitDialog from "../SetupDialog/SetupPathologyUnitDialog"
import api from "services/Api"

const setupPathologyUnitType = props => {

  const initialPathologySetupUnitValue = {
    unit_name: "",
    unit_type: "Patho",
    created_at: "2023-02-02 11:11:11"
      }

  const [openpathUnitDialog, setOpenPathUnitDialog] = useState();
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialPathologySetupUnitValue)


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  // const rowData = [
  //   {unit: 'Micrometer'}
  // ]

  const columnDefs = [
    { headerName: "Unit Name", field: "unit_name" }
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )


  const handleOpenPathUnitType = () => {
    setOpenPathUnitDialog(true);
  }

  const handleClosePathUnitType = () => {
    setOpenPathUnitDialog(false);
  }


  useEffect(() => {
    // getUsers from json
    getSetupPathoUnit()
  }, [])

  const getSetupPathoUnit = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getPathologySetupUnit().then(res => {
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
  
    api.postPathologySetupUnit(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });
  
    api
      .getPathologySetupUnit({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSetupPathoUnit();
        setFormData(initialPathologySetupUnitValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Unit Type List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenPathUnitType}>
                    <i className="fa fa-plus"></i>&nbsp; Add Unit Type
                  </button>
                </div>
                <div
                  className="ag-theme-alpine"
                  style={{height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                  <SetupPathologyUnitDialog open={openpathUnitDialog} handleClose={handleClosePathUnitType} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupPathologyUnitType)
