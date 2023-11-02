import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//redux
import SetupPathologyDialog from "../SetupDialog/SetupPathologyDialog"
import api from "services/Api"

function SetupPathology(){

  const initialPathologySetupCategoryValue = {
    category_name: "",
    created_at: "2023-02-02 11:11:11"
      }

const [openPathDiaolog, setOpenPathDialog] = useState(false);
const [tableData,setTableData] = useState()
const [formData, setFormData] = useState(initialPathologySetupCategoryValue)


const onChange = e => {
  //catch the parameters when changed.
  const { value, id } = e.target
  setFormData({ ...formData, [id]: value })
  // setFormData1({ ...formData1, [id]: value })
}


// const rowData = [
//     {category: 'New Category'}
// ]

  const columnDefs = [
    {headerName: 'Category Name', field: 'category_name'}
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenPathDialog = () => {
    setOpenPathDialog(true);
  }

  const handleClosePathDialog = () => {
    setOpenPathDialog(false);
  }


  useEffect(() => {
    // getUsers from json
    getSetupPathoCategory()
  }, [])

  const getSetupPathoCategory = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getPathologySetupCategory().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  function patientId(e){
    console.log(e.target.value,"nameeeeeeeeeeee")
    const patientId = e.target.value;
    setId(patientId);
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
  
    api.postPathologySetupCategory(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });
  
    api
      .getPathologySetupCategory({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSetupPathoCategory();
        setFormData(initialPathologySetupCategoryValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Pathology Category List</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenPathDialog}><i className="fa fa-plus"></i>&nbsp; Add Pathology Category</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupPathologyDialog open={openPathDiaolog} handleClose={handleClosePathDialog}
                data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupPathology)
