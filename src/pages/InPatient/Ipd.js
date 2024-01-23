import React, { useState, useEffect, useCallback } from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo} from "react";
import IpdDialog from "./IpdDialog";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import './styles.css'

//i18n
import { withTranslation } from "react-i18next";
import api from "services/Api";

//redux

const Ipd = props => {
  const [patientid, setPatientid] = useState('')
  const patientID = patientid;

  const [id, setId] = useState('')

  const initialIpdValue = {

    patient_id: '',
    case_reference_id: '',
    pulse: '',
    temperature: '',
    respiration: '',
    bed: 'yes',
    casualty: 'normal',
    symptoms: '',
    patient_old: 'yes',
    note: '',
    refference: 'no',
    payment_mode: '',
    discharged: 'no',
    live_consult: '',
    bed: '1',
    created_at: '2023-05-06 18:06:07'
  }

  
  const [tableData, setTableData] = useState(null)
  
  const [formData, setFormData] = useState(initialIpdValue);
  const [fetchData,setFetchData] = useState('')

  console.log(formData,'formdata')
  

  console.log(fetchData, 'fetchdata')
  const handlePatientId = (e) =>{
    const id = e.target.value
    setPatientid(id)
    console.log(id,'idddd')
  }
  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
console.log(formData,"jjjjjjjjj")
  const handleClose = () => {
    setOpen(false);
  };

  function patientId(e){
    console.log(e.target.value,"nameeeeeeeeeeee")
    const patientId = e.target.value;
    setId(patientId);
  }

const columnDefs = [
  { headerName: "IPD No.", field: "id", filter: "agSetColumnFilter", cellStyle: {color: 'blue', fontWeight: '500', backgroundColor: '#EEEEEE'},cellRenderer: (params) => {
    const ipdno = params.data.id;
    return (
      <a href={`/ipdprofile/${ipdno}`}>
        {"IPDN" + ipdno}
      </a>
    );
  }},
  
    {headerName: "Case ID", field: "case_reference_id"},
    { headerName: "Name", field: "patient_name" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Contact", field: "mobileno" },
    { headerName: "Consultant", field: "cons_doctor" },
    { headerName: "Bed", field: "bed" },
    { headerName: "Credit Limit", field: "credit_limit" },
    
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );
console.log(formData,"Ddddddddd")
  
  useEffect(() => {
    // getUsers from json
    getIpdUsers()
  }, [])

  const getIpdUsers = () => {
    api.getIpdUser().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    api.postIpdUser(formData).then(resp => {
      console.log(resp)
    })
   

    api
      .getIpdUser({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getIpdUsers()
        setFormData(initialIpdValue)
        preventDefault()
      })
      handleClose()
  }

  const onGridReady = useCallback(params => {
    api
      .getIpd()
      .then(resp => resp.data())
      .then(data => {
        setRowData(data)
      })
  }, [])


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("IPD")}
            breadcrumbItem={props.t("In Patient")}
          />
          <IpdDialog open={open} handleClose={handleClose} onChange={onChange} data={formData} handleFormSubmit={handleFormSubmit} setFetchData={setFetchData} patientId={patientId} fetchData={fetchData} handlePatientId={handlePatientId}/>
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <button className="btn-mod custom-btn" onClick={handleClickOpen}>
            + Add Patient
          </button>
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: 700, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            domLayout='autoHeight'
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Ipd);
