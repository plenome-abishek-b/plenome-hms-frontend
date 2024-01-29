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
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const setupFrontOfficeComplainType = props => {

  const initialFrontofficeSetupComplainTypeValue = {
    complaint_type: "",
    description: "",
    created_at: "2023-02-02 11:11:11"
      }


  const [opencomplainDialog, setOpenComplainDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialFrontofficeSetupComplainTypeValue)
  const [selectedData,setSelectedData] = useState({})
  // const rowData = [
  //   {
  //     cmptype: " Charges",
  //     description: "others",
  //     action: "",
  //   },
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenComplainDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupFrontOffice_complaint_Type(data.id)
         getFrontSetupComplainType()
   }else{
    console.log("cancelled");
   }
  
   }
  const columnDefs = [
    { headerName: "Complain Type", field: "complaint_type" },
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

  const handleOpenComplain = () => {
    setSelectedData({})
    setOpenComplainDialog(true)
  }

  const handleCloseComplain = () => {
    setOpenComplainDialog(false)
  }


  useEffect(() => {
    // getUsers from json
    getFrontSetupComplainType()
  }, [])
  const getFrontSetupComplainType = async () =>{
   const response = await api?.getSetupFrontOffice_complaint_Type()
   const {data} = response
   setTableData(data)
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
                    frameworkComponents={components}
                  />
                  <SetupComplainDialog selectedData ={selectedData} getFrontSetupComplainType={getFrontSetupComplainType} open={opencomplainDialog} handleClose={handleCloseComplain} />
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
