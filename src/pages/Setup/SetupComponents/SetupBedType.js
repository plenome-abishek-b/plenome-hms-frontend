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

const SetupBedType = props => {


  const initialSetupBedTypeValue = {
    name: "",
    created_at: "2023-02-02 11:11:11"
  }

    const [openSetupBedtypeDialog, setOpenSetupBedtypeDialog] = useState()
    const [tableData,setTableData] = useState()
    const [formData,setFormData] = useState(initialSetupBedTypeValue)

  // const rowData = [
  // {purpose: 'Standard', action: ''}
  // ]

  const columnDefs = [
    { headerName: "Purpose", field: "name" }
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
    setOpenSetupBedtypeDialog(true);
  }

  const handleCloseBedtypeDialog = () => {
    setOpenSetupBedtypeDialog(false);
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getBedTypeList()
  }, [])

  const getBedTypeList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getBedTypeSetup().then(res => {
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
  
    api.postBedTypeSetup(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'ressss');
    });
  
    api
      .getBedTypeSetup({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getBedTypeList();
        setFormData(initialSetupBedTypeValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Bed Type List</h4>
          <Card>
            <CardBody>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button className="btn btn-primary bg-soft" onClick={handleOpenBedtypeDialog}><i className="fa fa-plus"></i>&nbsp; Add Bed Type</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupBedTypeDialog open={openSetupBedtypeDialog} handleClose={handleCloseBedtypeDialog} data={formData}
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

export default withTranslation()(SetupBedType)