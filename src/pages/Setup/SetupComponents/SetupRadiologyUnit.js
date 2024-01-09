import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupRadiologyUnitDialog from "../SetupDialog/SetupRadiologyUnitDialog"
import api from "services/Api"
import DeleteButtonRenderer from "common/data/delete-button"
import EditButtonRenderer from "common/data/update-button"

const setupRadiologyUnit = props => {
  const [openRadiologyUnitDialog, setOpenRadiologyUnitDialog] = useState();
  const [data,setData] = useState()
  const [selectedData,setSelectedData] = useState({})

  const rowData = [
    {unit: 'Micrometer'}
  ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenRadiologyUnitDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupRadiologyUnit(data.id)
         getRadiologyUnit()
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
  useEffect(()=>{
    getRadiologyUnit()
  },[])


  const handleOpenPathUnitType = () => {
    setSelectedData({})
    setOpenRadiologyUnitDialog(true);
  }

  const handleClosePathUnitType = () => {
    setOpenRadiologyUnitDialog(false);
  }
 const getRadiologyUnit = async () =>{
 const response = await api.getSetupRadiologyUnit()
 const {data} = response
 console.log(data,"get uniit");
 setData(data)
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
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  frameworkComponents={components}

                  />
                  <SetupRadiologyUnitDialog selectedData={selectedData} getRadiologyunit={getRadiologyUnit} open={openRadiologyUnitDialog} handleClose={handleClosePathUnitType} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupRadiologyUnit)
