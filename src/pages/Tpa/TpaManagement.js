import PropTypes from "prop-types"
import React, {useMemo , useState , useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
//i18n
import { withTranslation } from "react-i18next"
import TpaDialog from "./TpaDialog/TpaDialog"
import api from "services/Api"

//redux

const Tpa = props => {

  const initialTPAValue = {
    organisation_name: "",
    code: "",
    contact_no: "",
    address: "",
    contact_person_name: "",
    contact_person_phone: "",
    created_at: "2023-09-08 11:11:11"
  }


  const [openTpa, setOpenTpa] = useState();
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialTPAValue)




    

    const onChange = e => {
      //catch the parameters when changed.
      const { value, id } = e.target
      setFormData({ ...formData, [id]: value })
      // setFormData1({ ...formData1, [id]: value })
    }





  const handleOpenTpa = () => {
    setOpenTpa(true);
  }

  const handleCloseTpa = () => {
    setOpenTpa(false);
  }

  const columnDefs = [
    { headerName: "Name", field: "organisation_name" },
    { headerName: "Code", field: "code" },
    { headerName: "Phone", field: "contact_no" },
    { headerName: "Address", field: "address" },
    { headerName: "Contact Person Name", field: "contact_person_name" },
    { headerName: "Contact Person Phone", field: "contact_person_phone" },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  useEffect(() => {
    // getUsers from json
    getTPADetails()
  }, [])

  const getTPADetails = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getTPAManagement().then(res => {
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
  
    api.postTPAManagement(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    api
      .getTPAManagement({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getTPADetails();
        setFormData(initialTPAValue);
        console.log()
        event.preventDefault();
      });
  
      handleCloseTpa();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>TPA Management</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenTpa}>
                  <i className="fa fa-plus"></i>&nbsp; Add TPA
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 700, marginTop: "20px" }}
              >
                <AgGridReact rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    domLayout='autoHeight'
                />
                <TpaDialog open={openTpa} handleClose={handleCloseTpa} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Tpa)
