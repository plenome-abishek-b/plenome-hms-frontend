import PropTypes from "prop-types"
import React, { useMemo, useState , useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupPurposeDialog from "../SetupDialog/SetupFrontOfficeDialog"      
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const setupFrontofficePurpose = props => {

  const initialFrontofficeSetupPurposeValue = {
    visitors_purpose: "",
    description: "",
    created_at: "2023-02-02 11:11:11"
      }



  const [openPurposeDialog, setOpenPurposeDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialFrontofficeSetupPurposeValue)
  const [selectedData,setSelectedData] = useState({})

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


  // const rowData = [
  //   {
  //     purpose: "Appointment Charges",
  //     description: "others",
  //     action: "",
  //   },
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenPurposeDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupFrontOffice_purpose(data.id)
         getFrontSetupPurpose()
   }else{
    console.log("cancelled");
   }
  
   }
  const columnDefs = [
    { headerName: "Purpose", field: "visitors_purpose" },
    { headerName: "Description", field: "description" },
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

  const handleOpenPurpose = () => {
    setSelectedData({})
    setOpenPurposeDialog(true)
  }

  const handleClosePurpose = () => {
    setOpenPurposeDialog(false)
  }


  useEffect(() => {
    // getUsers from json
    getFrontSetupPurpose()
  }, [])

  const getFrontSetupPurpose = async () => {
    const response = await api.getSetupFrontOffice_Porpose()
    console.log(response.data,"all frontoffice");
    setTableData(response?.data)
  }

  function patientId(e){
    console.log(e.target.value,"nameeeeeeeeeeee")
    const patientId = e.target.value;
    setId(patientId);
  }

  function handleFormSubmit(event) {
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
          <h4>Purpose List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenPurpose}>
                    <i className="fa fa-plus"></i>&nbsp; Add Purpose
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
                    frameworkComponents={components}
                  />
                  <SetupPurposeDialog selectedData={setSelectedData} open={openPurposeDialog} handleClose={handleClosePurpose} getFrontSetupPurpose={getFrontSetupPurpose} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFrontofficePurpose)
