import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupFindingCategoryDialog from "../SetupDialog/SetupFindingCategoryDialog"
import DeleteButtonRenderer from "common/data/delete-button"
import EditButtonRenderer from "common/data/update-button"
import api from "services/Api"
import { useEffect } from "react"
//redux


const setupFindingCategory = props => {
  
    const [openFindingCategoryDialog, setOpenFindingCategoryDialog] = useState()
    const [selectedData,setSelectedData] = useState({})
    const [tableData,setTableData] = useState([])
  // const rowData = [
  //   { category: 'Fever', action:''}
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenFindingCategoryDialog(true)
   }

   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetup_Finding_Category(data.id)
         getFindingCategory()
   }else{
    console.log("cancelled");
   }
   }
   useEffect(()=>{
   getFindingCategory()
   },[])
  const getFindingCategory = async () =>{
   const response = await api.getSetup_Finding_Category()
   const {data} = response
   console.log(data,"response of finding response");
   setTableData(data)
  }
  const columnDefs = [
    {headerName: 'Category', field: 'category'},
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
    // {headerName: 'Action', field: 'action'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenFindingCategory = () => {
    setSelectedData({})
    setOpenFindingCategoryDialog(true);
  }

  const handleCloseFindingCategory = () => {
    setOpenFindingCategoryDialog(false);
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
          <h4>Finding Category List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenFindingCategory}>
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
                <SetupFindingCategoryDialog getFindingCategory={getFindingCategory} open={openFindingCategoryDialog} selectedData={selectedData} handleClose={handleCloseFindingCategory}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupFindingCategory)
