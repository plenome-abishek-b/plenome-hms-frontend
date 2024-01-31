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
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"


const SetupSymptomsType = props => {

  const initialSymptomTypeValue = {
    symptoms_type: "",
    Hospital_id:1
   }

    const [open, setOpen] = useState('');
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSymptomTypeValue)
    const [selectedData,setSelectedData] = useState({})

    const handleDeleteClick = async (data) =>{
      const userConfirmed = window.confirm('Are you sure you want to delete this item?');
             console.log(userConfirmed,"delete");
     if(userConfirmed){
           const deleteResponse = await api.deleteSetupSymptoms_Type(data.id)
           getSymptomsTypeList()
     }else{
      console.log("cancelled");
     }
     }
     const handleEditClick = async (data) =>{
      console.log(data,"edit");
      setOpen(true)
      setSelectedData(data)
      // setSelectedData(data)
      // // setSelectedData()
      // setOpenSetupOperationsDialog(true)
     }
  // const rowData = [
  //   {type: 'Headache'}
  // ]

  const columnDefs = [
    { 
      headerName: "Symptoms Type", 
      field: "symptoms_type", 
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
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
    setSelectedData({})
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  useEffect(() => {
    // getUsers from json
    getSymptomsTypeList()
  }, [])

  const getSymptomsTypeList = async () => {
    const response = await api?.getSetupSymptoms_Type()
    console.log(response?.data);
    const {data} = response
    setTableData(data)
  }

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer  onClick={() => props.onDeleteClick(props.data)} />
      </div>
    )
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
                  <button className="btn-mod bg-soft" onClick={handleOpenDialog}>
                    <i className="fa fa-plus"></i>&nbsp; Add Symptoms Type
                  </button>
                </div>
                <SetupSymptomsTypeDialog getSymptomsTypeList={getSymptomsTypeList} selectedData={selectedData} open={open} handleClose={handleClose} />
                <div
                  className="ag-theme-alpine"
                  style={{height: 700, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    frameworkComponents={components}
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