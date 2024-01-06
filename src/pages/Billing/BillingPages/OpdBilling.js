import PropTypes from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import api from "services/Api";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import OpdBillingDialog from "../BillingDialog/OpdBillingDialog";
// import { clearConfigCache } from "prettier";
//redux

const OpdBilling = props => {
  const initialOpdValue = {
    case_reference_id: "",
    patient_id: "",
    generated_by: "1",
    is_ipd_moved: "0",
    discharged: "no",
    case_type: "",
    payment_mode: "",
    can_delete: "yes",
    opd_details_id: "36",
    organisation_id: "1",
    cons_doctor: "",
    patient_charge_id: "1",
    transaction_id: "19",
    created_at: "2023-02-02 11:11:11"
  }
  const [id, setId] = useState('')

const [fetchData,setFetchData] = useState('')
console.log(fetchData,'fetchdata');
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialOpdValue)

  {console.log(tableData,'data')}


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }
console.log(formData,"UUUUUUUUUUUUUUUUUUUUUUUUUUUU")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(tableData,"jjijijij")

  const columnDefs = [
    {
        headerName: "Name", field: "patient_name", cellRenderer: (params) => {
          const name = params.data.patient_name;
          return (
            <a href={`/opdprofile`}>
              {name}
            </a>
          );
        }
      },
    {
      headerName: "Patient ID",
      field: "patient_id",
      filter: "agSetColumnFilter",
      cellStyle: { color: 'red', fontWeight: '500', backgroundColor: '#EEEEEE' }
    },
    { headerName: "Gaurdian name", field: "guardian_name" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Contact", field: "mobileno" },
    { headerName: "Consultant", field: "name" },
    { headerName: "Last visit", field: "appointment_date" },
    { headerName: "Total Recheckup", field: "total_recheckup" }
    //{ headerName: "Total Recheckup", field: "totalrecheckup" },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  useEffect(() => {
    // getUsers from json
    getDetails()
  }, [])

  const getDetails = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getOpdBillingDetails().then(res => {
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
  
    api.postOpdDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    api.postOpdVisits(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });
  
    api
      .getOpdDetails({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getDetails();
        setFormData(initialOpdValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }
  
   return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <Breadcrumbs
            title={props.t("OPD")}
            breadcrumbItem={props.t("Out Patient")}
          /> */}

          <h4>Opd Billing</h4>

          <OpdBillingDialog patientId={patientId} setFetchData={setFetchData} open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <button className="btn btn-secondary" onClick={handleClickOpen}>
              Add Outpatient
            </button>
          </div>
        </Container>
        <div
          className="ag-theme-alpine"
          style={{ height: 700, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(OpdBilling);