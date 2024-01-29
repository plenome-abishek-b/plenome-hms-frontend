import PropTypes from "prop-types"
import React, { useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import SetupPriorityDialog from "../SetupDialog/SetupPriorityDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const SetupPriority = props => {

    const initialFrontofficeSetupPriorityValue = {
        appoint_priority: "",
        created_at: "2023-02-02 11:11:11"
          }

  const [openPriorityDialog, setOpenPriorityDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialFrontofficeSetupPriorityValue)
  const [selectedData,setSelectedData] = useState({})

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }





//   const rowData = [
//     {
//         priority: " ipd",
//     },
//   ]
const handleEditClick = (data) =>{
  console.log(data,"edit");
  setSelectedData(data)
  // setSelectedData()
  setOpenPriorityDialog(true)
 }
 const handleDeleteClick = async (data) =>{
  const userConfirmed = window.confirm('Are you sure you want to delete this item?');
         console.log(userConfirmed,"delete");
 if(userConfirmed){
       const deleteResponse = await api.deleteSetupFrontOffice_appointmentPriority(data.id)
       getFrontofficeSetupPrior()
 }else{
  console.log("cancelled");
 }

 }
  const columnDefs = [
    { headerName: "Priority", field: "priority_status" },
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

  const handleOpenPriority = () => {
    setSelectedData({})
    setOpenPriorityDialog(true)
  }

  const handleClosePriority = () => {
    setOpenPriorityDialog(false)
  }

  useEffect(() => {
    // getUsers from json
    getFrontofficeSetupPrior()
  }, [])

  const getFrontofficeSetupPrior = async () => {
    const response = await api.getSetupFrontOffice_appointmentPriority()
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
          <h4>Appointment Priority List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-mod bg-soft" onClick={handleOpenPriority}>
                    <i className="fa fa-plus"></i>&nbsp; Add Priority
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
                  <SetupPriorityDialog open={openPriorityDialog} handleClose={handleClosePriority} getFrontofficeSetupPrior={getFrontofficeSetupPrior} selectedData={selectedData}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupPriority)
