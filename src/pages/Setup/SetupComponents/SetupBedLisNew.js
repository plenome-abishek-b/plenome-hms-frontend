import PropTypes from "prop-types"
import React ,{useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"
 
//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupBedListDialog from "../SetupDialog/SetupBedDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
 
const SetupBedLists = props => {
 
  const initialSetupBedValue = {
    name: "",
    bed_type_id: "",
    bed_group_id: "",
    is_active: "1",
    created_at: "2023-02-02 11:11:11"
  }
 
    const [openSetupBedDialog, setOpenSetupBedDialog] = useState()
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSetupBedValue)
    const [selectedData,setSelectedData] = useState({})
  // const rowData = [
  //   {name: 'GS-101', type: 'Standard', group: 'VIP Ward', used: 'true'},
  //   {name: 'GS-101', type: 'Standard', group: 'VIP Ward', used: 'true'}
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenSetupBedDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
    console.log(userConfirmed,"delete");
if(userConfirmed){
  const response = await api.deleteSetup_Bed(data?.id)
  getBedStatusList()
}else{
  console.log("else");
}
   }
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Bed Type", field: "Bed_Type" },
    { headerName: "Bed Group", field: "bed_group" },
    {
      headerName: "Used",
      field: "used",
      cellRendererFramework: (props) => (
        <input type="checkbox" readOnly checked={props.value === "yes"} />
      ),
    },
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
 
  const handleOpenBedDialog = () => {
    setSelectedData({})
    setOpenSetupBedDialog(true);
  }
 
  const handleCloseBedDialog = () => {
    setOpenSetupBedDialog(false);
  }
 
  useEffect(() => {
    // getUsers from json
    getBedStatusList()
  }, [])
 
  const getBedStatusList =async () => {
     const response = await api.getSetup_Bed()
     const {data} = response
     console.log(data,"consoling data");
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
          <h4>Bed List</h4>
          <Card>
            <CardBody>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button className="btn-mod bg-soft" onClick={handleOpenBedDialog}><i className="fa fa-plus"></i>&nbsp; Add Bed</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 800, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupBedListDialog selectedData={selectedData} getBedStatusList={getBedStatusList} open={openSetupBedDialog} handleClose={handleCloseBedDialog} data={formData}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
 
export default withTranslation()(SetupBedLists)