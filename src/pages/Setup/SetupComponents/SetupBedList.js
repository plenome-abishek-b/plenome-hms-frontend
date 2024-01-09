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

const SetupBedList = props => {

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

  // const rowData = [
  //   {name: 'GS-101', type: 'Standard', group: 'VIP Ward', used: 'true'},
  //   {name: 'GS-101', type: 'Standard', group: 'VIP Ward', used: 'true'}
  // ]

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Bed Type", field: "bed_type_name" },
    { headerName: "Bed Group", field: "bed_group_name" },
    {
      headerName: "Used",
      field: "used",
      cellRendererFramework: (props) => (
        <input type="checkbox" checked={props.value} />
      ),
    }
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
    setOpenSetupBedDialog(true);
  }

  const handleCloseBedDialog = () => {
    setOpenSetupBedDialog(false);
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


  useEffect(() => {
    // getUsers from json
    getBedList()
  }, [])

  const getBedList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getBedSetup().then(res => {
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
  
    api.postBedSetup(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'ressss');
    });
  
    api
      .getBedSetup({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getBedList();
        setFormData(initialSetupBedValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

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
                />
                <SetupBedListDialog open={openSetupBedDialog} handleClose={handleCloseBedDialog} data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit} />
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBedList)