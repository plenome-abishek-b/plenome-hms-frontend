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

  // const rowData = [
  //   {name: 'VIP Ward', floor: 'Ground Floor', description: 'The operating room (OR) is where both inpatient and outpatient surgeries are performed.', action: ''}
  // ]

  const columnDefs = [
    {headerName: 'Name', field: 'bed_group_name'},
    {headerName: 'Floor', field: 'floor_name'},
    {headerName: 'Description', field: 'description'}
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
    setOpenSetupBedgroupDialog(true);
  }

  const handleCloseBedGroup = () => {
    setOpenSetupBedgroupDialog(false);
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getBedGroupList()
  }, [])

  const getBedGroupList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getBedGroupSetup().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  function handleFormSubmit(event) {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    api.postBedGroupSetup(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'ressss');
    });
  
    api
      .getBedGroupSetup({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getBedGroupList();
        setFormData(initialSetupBedGroupValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Bed Group List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenBedGroup}><i className="fa fa-plus"></i>&nbsp; Add Bed Group</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 800, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                </div>
                <SetupBedGroupDialog open={openSetupBedgroupDialog} handleClose={handleCloseBedGroup} data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBedGroup)