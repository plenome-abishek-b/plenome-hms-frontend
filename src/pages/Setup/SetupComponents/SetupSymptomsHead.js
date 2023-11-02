import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupSymptomsDialog from "../SetupDialog/SetupSymptomsHeadDialog"
import api from "services/Api"


const SetupSymptomsHead = props => {



  const initialSymptomHeadValue = {
    symptoms_title: "",
    description: "",
    type: "",
    created_at: "2023-02-02 11:11:11"
  }

    const [open, setOpen] = useState('')
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSymptomHeadValue)

  // const rowData = [
  //   {shead: 'Thirst', type: 'Eat problem',desc: 'nothing'}
  // ]

  const columnDefs = [
    { headerName: "Symptoms Head", field: "symptom_head" },
    { 
      headerName: "Symptoms Type", 
      field: "symptoms_type", 
    },
    {headerName: "Symptoms Description", field: 'description'}
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

  const handleCloseDialog = () => {
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
    getSymptomsHeadList()
  }, [])

  const getSymptomsHeadList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getSymptomHeadSetup().then(res => {
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
  
    api.postSymptomHeadSetup(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });
  
    api
      .getSymptomHeadSetup({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSymptomsHeadList();
        setFormData(initialSymptomHeadValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Symptoms Head List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary bg-soft" onClick={handleOpenDialog}>
                    <i className="fa fa-plus"></i>&nbsp; Add Symptoms Head
                  </button>
                </div>
                <SetupSymptomsDialog open={open} handleClose={handleCloseDialog} data={formData}
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

export default withTranslation()(SetupSymptomsHead)