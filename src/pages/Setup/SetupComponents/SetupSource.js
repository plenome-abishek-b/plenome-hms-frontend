import PropTypes from "prop-types"
import React, { useMemo, useState , useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupSourceDialog from "../SetupDialog/SetupSourceDialog"
import api from "services/Api"
import DeleteButtonRenderer from "common/data/delete-button"
import EditButtonRenderer from "common/data/update-button"

const SetupSource = props => {


    const initialFrontofficeSetupSourceValue = {
        source: "",
        description: "",
        created_at: "2023-02-02 11:11:11"
          }

  const [openSourceDialog, setOpenSourceDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialFrontofficeSetupSourceValue)
  const [selectedData,setSelectedData] = useState({})

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }



//   const rowData = [
//     {
//         source: " ipd",
//       description: "others",
//       action: "",
//     },
//   ]
const handleEditClick = (data) =>{
  console.log(data,"edit");
  setSelectedData(data)
  // setSelectedData()
  setOpenSourceDialog(true)
 }
 const handleDeleteClick = async (data) =>{
  const userConfirmed = window.confirm('Are you sure you want to delete this item?');
         console.log(userConfirmed,"delete");
 if(userConfirmed){
       const deleteResponse = await api.deleteSetupFrontOffice_source(data.id)
       getFrontSetupSource()
 }else{
  console.log("cancelled");
 }

 }

  const columnDefs = [
    { headerName: "Source", field: "source" },
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

  const handleOpenSource = () => {
    setSelectedData({})
    setOpenSourceDialog(true)
  }

  const handleCloseSource = () => {
    setOpenSourceDialog(false)
  }

  useEffect(() => {
    // getUsers from json
    getFrontSetupSource()
  }, [])

  const getFrontSetupSource = async () =>{
   const response = await api.getSetupFrontOffice_source()
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
          <h4>Source List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenSource}>
                    <i className="fa fa-plus"></i>&nbsp; Add Source
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
                  <SetupSourceDialog open={openSourceDialog} selectedData={selectedData} getFrontSetupSource={getFrontSetupSource} handleClose={handleCloseSource} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupSource)
