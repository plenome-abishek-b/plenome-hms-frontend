import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import SetupUnitTypeDialog from "../SetupDialog/SetupUnitTypeDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
import { setElSeg } from "@fullcalendar/core"

const setupUnitType = props => {
  const [openUnitTypeDialog, setOpenUnitTypeDialog] = useState();

  const initialUnitValue = {
    unit:'',
    created_at: '2023-09-08 11:11:11'
  }

  const [tableData, setTableData] = useState(null)

  const [formData, setFormData] = useState(initialUnitValue)
  const [selectedData,setSelectedData] = useState({});

  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenUnitTypeDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteUnitType(data.charge_unit_id)
         getUnit()
   }else{
    console.log("cancelled");
   }

   }

  const columnDefs = [
    { headerName: "Unit Name", field: "unit" },
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

  
  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleOpenUnitType = () => {
    setSelectedData({unit:''})
    setOpenUnitTypeDialog(true);
  }

  const handleCloseUnitType = () => {
    setOpenUnitTypeDialog(false);
  }

  useEffect(() => {
    // getUsers from json
    getUnit()
  }, [])

  const getUnit = () => {
    api.getUnitType
    ().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postUnitType(formData).then(resp => {
      console.log(resp)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    handleClose()

    api
      .getUnitType({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getUnit()
        setFormData(initialUnitValue)
        preventDefault()
      })
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
                  <button className="btn btn-primary bg-soft" onClick={handleOpenUnitType}>
                    <i className="fa fa-plus"></i>&nbsp; Add Unit Type
                  </button>
                </div>
                <div
                  className="ag-theme-material"
                  style={{height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  frameworkComponents={components}
                  />
                  <SetupUnitTypeDialog getUnit={getUnit} open={openUnitTypeDialog} handleClose={handleCloseUnitType} selectedData={selectedData} data={formData}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(setupUnitType)
