import PropTypes from "prop-types"
import React ,{useEffect, useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupFindingDialog from "../SetupDialog/SetupFindingDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const setupFindings = props => {

    const [openFindingDialog, setOpenFindingDialog] = useState();
    const [tableData,setTableData] = useState([]);
    const [selectedData,setSelectedData] = useState([])
  // const rowData = [
  //   {finding: 'Stomach Pain', category: 'Fever', find: 'The medical community generally defines a fever as a body temperature above 100.4 degrees Fahrenheit. A body temp between 100.4 and 102.2 degree is usually considered a low-grade fever.', action:''}
  // ]
  const getFindings = async () =>{
   const response = await api.getSetup_Findings()
   const {data} = response;
   setTableData(data)
   console.log(data,"findings response");
  }
  useEffect(()=>{
    getFindings()
  },[])
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenFindingDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetup_Findings(data.id)
         getFindings()
   }else{
    console.log("cancelled");
   }
   }

  const columnDefs = [
    {headerName: 'Finding', field: 'name'},
    {headerName: 'Category', field: 'finding_category_id'},
    {headerName: 'Finding Description', field: 'description'},
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

  const handleOpenFinding = () => {
    setSelectedData({})
    setOpenFindingDialog(true);
  }

  const handleCloseFindingDialog = () => {
    setOpenFindingDialog(false);
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
          <h4>Finding List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenFinding}>
                  <i className="fa fa-plus"></i>&nbsp; Add Finding
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupFindingDialog getFindings={getFindings} selectedData={selectedData} open={openFindingDialog} handleClose={handleCloseFindingDialog}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFindings)
