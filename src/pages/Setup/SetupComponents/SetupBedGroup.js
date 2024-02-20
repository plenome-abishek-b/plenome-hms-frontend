import PropTypes from "prop-types"
import React ,{useMemo, useState , useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupBedGroupDialog from "../SetupDialog/SetupBedGroupDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
//redux

const SetupBedGroup = props => {

  const initialSetupBedGroupValue = {
    name: "",
    color: "",
    description: "",
    floor: "",
    is_active: "1",
    created_at: "2023-02-02 11:11:11"
  }
  
  const [openSetupBedgroupDialog, setOpenSetupBedgroupDialog] = useState()
  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialSetupBedGroupValue)
  const [selectedData,setSelectedData] = useState({})
  // const rowData = [
  //   {name: 'VIP Ward', floor: 'Ground Floor', description: 'The operating room (OR) is where both inpatient and outpatient surgeries are performed.', action: ''}
  // ]
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenSetupBedgroupDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
    console.log(userConfirmed,"delete");
if(userConfirmed){
  const response = await api.deleteSetup_bed_group(data?.id)
  getBedGroupList()
}else{
  console.log("else");
}
   }
  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Floor', field: 'floor_name'},
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

  const handleOpenBedGroup = () => {
    setSelectedData({})
    setOpenSetupBedgroupDialog(true);
  }

  const handleCloseBedGroup = () => {
    setOpenSetupBedgroupDialog(false);
  }

  
  useEffect(() => {
    // getUsers from json
    getBedGroupList()
  }, [])

  const getBedGroupList = async () => {
   const response = await api.getSetup_bed_group()
   const {data} = response
   console.log(data,"getting");
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
          <h4>Bed Group List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenBedGroup}><i className="fa fa-plus"></i>&nbsp; Add Bed Group</button>
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
                </div>
                <SetupBedGroupDialog getBedGroupList={getBedGroupList} selectedData={selectedData} open={openSetupBedgroupDialog} handleClose={handleCloseBedGroup} data={formData}/>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBedGroup)