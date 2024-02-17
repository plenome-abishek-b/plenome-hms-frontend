import PropTypes from "prop-types"
import React ,{useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupBedTypeDialog from "../SetupDialog/SetupBedTypeDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"

const SetupBedType = props => {


  const initialSetupBedTypeValue = {
    name: "",
    Hospital_id:1
    }

    const [openSetupBedtypeDialog, setOpenSetupBedtypeDialog] = useState()
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSetupBedTypeValue)
    const [selectedData,setSelectedData] = useState({})
  // const rowData = [
  // {purpose: 'Standard', action: ''}
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenSetupBedtypeDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
    console.log(userConfirmed,"delete");
if(userConfirmed){
  const response = await api.deleteSetup_bedType(data?.id)
  getBedTypeList()
}else{
  console.log("else");
}
   }
  const columnDefs = [
    { headerName: "Purpose", field: "name" },
    {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: 'actionsRenderer',
    cellRendererParams: {
      onEditClick: (row) => handleEditClick(row),
      onDeleteClick: (row) => handleDeleteClick(row),
    },
  },
  ];
  
  

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenBedtypeDialog = () => {
    setSelectedData({})
    setOpenSetupBedtypeDialog(true);
  }

  const handleCloseBedtypeDialog = () => {
    setOpenSetupBedtypeDialog(false);
  }


  useEffect(() => {
    // getUsers from json
    getBedTypeList()
  }, [])

  const getBedTypeList = async () => {
    const response = await api?.getSetup_bed_type()
    const {data} = response
    console.log(data,"bedtype");
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
          <h4>Bed Type List</h4>
          <Card>
            <CardBody>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button className="btn-mod bg-soft" onClick={handleOpenBedtypeDialog}><i className="fa fa-plus"></i>&nbsp; Add Bed Type</button>
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
                <SetupBedTypeDialog getBedTypeList={getBedTypeList} open={openSetupBedtypeDialog} selectedData={selectedData} handleClose={handleCloseBedtypeDialog}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBedType)