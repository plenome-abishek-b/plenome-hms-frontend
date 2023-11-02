import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupSymptomsTypeDialog from "../SetupDialog/SetupSymptomsTypeDialog"
import api from "services/Api"


const SetupSymptomsType = props => {

  const initialSymptomTypeValue = {
    symptoms_type: "",
    created_at: "2023-02-02 11:11:11"
  }

    const [open, setOpen] = useState('');
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSymptomTypeValue)


  // const rowData = [
  //   {type: 'Headache'}
  // ]

  const columnDefs = [
    { 
      headerName: "Symptoms Type", 
      field: "symptoms_type", 
    }
  ];
  
  
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenDialog = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


  useEffect(() => {
    // getUsers from json
    getSymptomsTypeList()
  }, [])

  const getSymptomsTypeList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getSymptomTypeSetup().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
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
  
    api.postSymptomTypeSetup(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });
  
    api
      .getSymptomTypeSetup({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSymptomsTypeList();
        setFormData(initialSymptomTypeValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Symptoms Type List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary bg-soft" onClick={handleOpenDialog}>
                    <i className="fa fa-plus"></i>&nbsp; Add Symptoms Type
                  </button>
                </div>
                <SetupSymptomsTypeDialog open={open} handleClose={handleClose} data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit} />
                <div
                  className="ag-theme-alpine"
                  style={{height: 700, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupSymptomsType)