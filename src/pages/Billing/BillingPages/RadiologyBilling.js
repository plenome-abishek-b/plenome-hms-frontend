import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
//ag-grid modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useEffect , useState } from "react";
import { Link } from "react-router-dom";
import BillDialog from "pages/Pathology/billDialog";
import RadiologybillingDialog from "../BillingDialog/RadiologybillingDialog";
import api from "services/Api";


const RadiologyBilling = props => {

    const initialRadiologyBillValue = {
        case_reference_id: "1",
        patient_id: "",
        generated_by: "1",
        doctor_id: "2",
        transaction_id: "1",
        tax_percentage: "10.00",
        apply_charge: "10.00",
        created_at: "2023-02-02 11:11:11",
        collection_specialist: "1",
        approved_by: "1",
        section: "OPD",
        ambulance_call_id: "1",
        appointment_id: "1",
        opd_id: "1",
        ipd_id: "4",
        pharmacy_bill_basic_id: "1",
        radiology_billing_id: "1",
        blood_donor_cycle_id: "1",
        blood_issue_id: "1",
        date: "2023-02-02",
        basicId: "1",
        doctor_name: "",
        reporting_date: "2023-02-02",
        total: "",
        discount_percentage: "10.00",
        discount: "10.00",
        tax: "10.00",
        net_amount: "",
        consultant_doctor: "",
        radiology_center: "yes",
        radiology_id: "1",
        radiology_bill_id: "1",
        amount: ""
      }


  const [open, setOpen] = React.useState(false);
  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialRadiologyBillValue)
  const [fetchData,setFetchData] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

//  const rowData = [
//     {bill_no: '1', caseid: '100', rptdate: '2023-05-06', name: 'Abishek', ref: 'Amit singh', note: '',prev: '',amt: '200',paidamt: '100',balance: '50' }
//   ];



  const columnDefs = [
    {headerName: 'Bill No', field: 'id'},
    {headerName: 'Case ID', field: 'case_reference_id'},
    {headerName: 'Reporting Date', field: 'date'},
    {headerName: 'Patient Name', field: 'patient_name'},
    {headerName: 'Reference Doctor', field: 'doctor_name'},
    {headerName: 'Note', field: 'note'},
    {headerName: 'Amount', field: 'total'},
    {headerName: 'Paid Amount', field: 'net_amount'}
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getRadiologyBillList()
  }, [])

  const getRadiologyBillList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getRadiologyBillingDetails().then(res => {
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
  
    api.postRadiologyBillingDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    api.postRadiologyReportBillingDetails(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    api.postPathologyTransaction(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });
  
    api
      .getRadiologyBillingDetails({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getRadiologyBillList();
        setFormData(initialRadiologyBillValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Radiology Billing</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleClickOpen}><i className="fas fa-microscope"></i> &nbsp;Add Radiology Bill</button>
          </div>
          <RadiologybillingDialog open={open} handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
            setFetchData={setFetchData}/>
          <div
            className="ag-theme-balham"
            style={{ height: 700, marginTop: "20px" }}
          >
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(RadiologyBilling);