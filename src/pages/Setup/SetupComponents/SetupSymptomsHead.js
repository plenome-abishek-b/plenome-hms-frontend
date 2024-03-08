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
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"


const SetupSymptomsHead = props => {



  const initialSymptomHeadValue = {
    symptoms_title: "",
    description: "",
    type: "",
  }

    const [open, setOpen] = useState('')
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSymptomHeadValue)
    const [selectedData,setSelectedData] = useState({})
  // const rowData = [
  //   {shead: 'Thirst', type: 'Eat problem',desc: 'nothing'}
  // ]
  const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupSymptoms_header(data.id)
         getSymptomsHeadList()
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
  const columnDefs = [
    { headerName: "Symptoms Head", field: "symptoms_head" },
    { 
      headerName: "Symptoms Type", 
      field: "symptoms_type",
    },
    {headerName: "Symptoms Description", field: 'description'},
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

  const getSymptomsHeadList = async  () => {
    const response = await api?.getSetupSymptoms_header()
    console.log(response.data,"eeee");  
    setTableData(response?.data)
  }
  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    )
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
                  <button className="btn-mod bg-soft" onClick={handleOpenDialog}>
                    <i className="fa fa-plus"></i>&nbsp; Add Symptoms Head
                  </button>
                </div>
                <SetupSymptomsDialog getSymptomsHeadList={getSymptomsHeadList} selectedData={selectedData} open={open} handleClose={handleCloseDialog}/>
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

export default withTranslation()(SetupSymptomsHead)