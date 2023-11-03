import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//ag-grid modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useState , useEffect } from "react";
import DeathDialog from "./DeathRecordDialog";
import api from "services/Api";

//redux

const Deathrecord = props => {

  const initialDeathRecordValue = {
    patient_id: "1",
    case_reference_id: "1",
    attachment: "",
    attachment_name: "text",
    death_date: "",
    guardian_name: "",
    death_report: "",
    is_active: "yes",
    created_at: "2023-09-08 11:11:11",
  }

  const [open, setOpen] = useState()
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialDeathRecordValue)

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const columnDefs = [
    { headerName: 'Case ID', field: 'case_reference_id' , cellStyle: {backgroundColor: '#EEEEEE', fontWeight: 'bold', color: 'red'}},
    { headerName: 'Reference no.', field: 'reference_no' },
    { headerName: 'Patient Name', field: 'Patient name' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Guardian Name', field: 'guardian_name'},
    { headerName: 'Death Date', field: 'death_date' },
    { headerName: 'Report', field: 'death_report' },
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
    getDeathRecordList()
  }, [])

  const getDeathRecordList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getDeathRecordDetails().then(res => {
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
  
    api.postDeathRecordDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

  
    api
      .getDeathRecordDetails({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getDeathRecordList();
        setFormData(initialDeathRecordValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Death Record")}
            breadcrumbItem={props.t("Death Records")}
          />
          <div style={{display: 'flex',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn fw-bold text-white" style={{backgroundColor: '#377fc7'}} onClick={handleClickOpen}>
              Add Death Record
            </button>
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
          </div>
          <DeathDialog 
            open={open}
            handleClose={handleClose}
            data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};


export default withTranslation()(Deathrecord);