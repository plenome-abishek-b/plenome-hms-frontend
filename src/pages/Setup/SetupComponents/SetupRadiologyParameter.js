import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupRaiologyParameterDialog from "../SetupDialog/SetupRadiologyParameterDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

function SetupRadiologyParameter(){
const [openParamDiaolog, setOpenParamDialog] = useState(false);
const [data,datas] = useState([])
const [selectedData,setSelectedData] = useState({})

const rowData = [
    {category: 'New Category'}
]
const handleEditClick = (data) =>{
  console.log(data,"edit");
  setSelectedData(data)
  // setSelectedData()
  setOpenParamDialog(true)
 }
 const handleDeleteClick = async (data) =>{
  const userConfirmed = window.confirm('Are you sure you want to delete this item?');
         console.log(userConfirmed,"delete");
 if(userConfirmed){
       const deleteResponse = await api.deleteSetupRadiologyParameter(data.id)
       getRadiologyParameter()
 }else{
  console.log("cancelled");
 }

 }
  const columnDefs = [
    {headerName: 'Parameter Name', field: 'parameter_name'},
    {headerName: 'Reference Range', field: 'reference_range'},
    {headerName: 'Unit', field: 'unit'},
    {headerName: 'Description', field: 'description'},
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
    getRadiologyParameter()
  },[])

  const handleOpenParamDialog = () => {
    setSelectedData({})
    setOpenParamDialog(true);
  }

  const handleCloseParamDialog = () => {
    setOpenParamDialog(false);
  }
  const getRadiologyParameter = async () =>{
  const response = await api.getSetupRadiologyParameter()
  const {data} = response
  datas(data)
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
          <h4>Radiology Parameter List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenParamDialog}><i className="fa fa-plus"></i>&nbsp; Add Pathology Category</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={data}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupRaiologyParameterDialog selectedData={selectedData} getRadiologyParameter={getRadiologyParameter} open={openParamDiaolog} handleClose={handleCloseParamDialog}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupRadiologyParameter)
