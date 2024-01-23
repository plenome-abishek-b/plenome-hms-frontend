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
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const setupPathologyUnitType = props => {

  const initialPathologySetupUnitValue = {
    unit_name: "",
    unit_type: "",
      }

  const [openpathUnitDialog, setOpenPathUnitDialog] = useState();
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialPathologySetupUnitValue)
  const [selectedData,setSelectedData] = useState({})


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  // const rowData = [
  //   {unit: 'Micrometer'}
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenPathUnitDialog(true);
  
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteetupPathologyUnit(data.id)
         getSetupPathoUnit()
   }else{
    console.log("cancelled");
   }
  
   }
  const columnDefs = [
    { headerName: "Unit Name", field: "unit_name" },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
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
    setSelectedData({})
    setOpenPathUnitDialog(true);
  }

  const handleClosePathUnitType = () => {
    setOpenPathUnitDialog(false);
  }


  useEffect(() => {
    // getUsers from json
    getSetupPathoUnit()
  }, [])

  const getSetupPathoUnit =async () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    // api.getPathologySetupUnit().then(res => {
    //   console.log(res,'response');
    //   setTableData(res.data)})
    // api.http
    const response = await api.getSetupPathologyUnit()
    const {data} = response
    setTableData(data)
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
  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
  };


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
                    frameworkComponents={components}

                  />
                  <SetupPathologyUnitDialog getSetupPathoUnit={getSetupPathoUnit} selectedData={selectedData} open={openpathUnitDialog} handleClose={handleClosePathUnitType} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
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
