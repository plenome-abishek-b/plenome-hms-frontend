import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
//ag-grid modules
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo , useState , useEffect } from "react";
import { Link } from "react-router-dom";
import BloodComponentIssueBillingDialog from "../BillingDialog/BloodcomponentIssueBillingDialog";
import api from "services/Api";

const BloodComponentIssueBilling = props => {

  const initialBillingBloodComponentIssueValue = {
    patient_id: "",
    case_reference_id: "1",
    blood_donor_cycle_id: "1",
    date_of_issue: "",
    reference: "",
    charge_id: "1",
    standard_charge: "",
    tax_percentage: "",
    discount_percentage: "",
    amount: "",
    net_amount: "",
    institution: "IITM",
    technician: "",
    remark: "",
    generated_by: "1",
    created_at: "2023-02-02 11:11:11",
    section: "Bloodbank",
    ambulance_call_id: "1",
    appointment_id: "1",
    opd_id: "1",
    ipd_id: "4",
    pharmacy_bill_basic_id: "1",
    pathology_billing_id: "1",
    radiology_billing_id: "1",
    blood_donor_cycle_id: "1",
    blood_issue_id: ""
  }


  const [open, setOpen] = React.useState(false);
  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialBillingBloodComponentIssueValue)
  const [fetchData,setFetchData] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


//  const rowData = [
//     {bill_no: 'BIB01', caseid: '100', issuedate: '2023-05-06', recieved_to: 'Abishek', bldgrp: 'B+ve',component:'Platelets', gender: 'male',donor: 'hari',bags: '2',amt: '200',paidamt: '100',balance: '50' }
//   ];

  const columnDefs = [
    {headerName: 'Bill No', field: 'id'},
    {headerName: 'Case ID', field: 'case_reference_id'},
    {headerName: 'Issue Date', field: 'date_of_issue'},
    {headerName: 'Recieved To', field: 'patient_name'},
    {headerName: 'Blood Group', field: 'name'},
    {headerName: 'Component', field: 'name'},
    {headerName: 'Gender', field: 'gender'},
    {headerName: 'Donor Name', field: 'donor_name'},
    {headerName: 'Bags', field: 'bag_no'},
    {headerName: 'Amount', field: 'bi_amount'},
    // {headerName: 'Paid Amount', field: 'paid_amount'},
    // {headerName: 'Balance Amount', field: 'balance_amount'}
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
    getBillingBloodIssueComponentList()
  }, [])

  const getBillingBloodIssueComponentList = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getBloodIssueComponent().then(res => {
      console.log(res,'response');
      setTableData(res.data)})
    
    api.http
  }

  const handleFormSubmit = async(event) => {

    // const payload = {
    //   case_reference_id: "1",
    //   patient_id: id, // Assign the patient ID to the patient_id field
    //   generated_by: "1",
    //   is_ipd_moved: "no",
    //   discharged: "2023-04-25 14:07:22",
    //   created_at: ""
    // };
  
    const response= await api.postBloodIssueComponent(formData)
    const data = response.data.data+1;
    console.log(data, 'id');

        setFormData((prevFormData) => ({
            ...prevFormData,
            blood_issue_id: data   
      }));
      console.log(formData, 'formmm');
      await api.postTransaction(formData).then(resp => {
        console.log(resp);
        console.log(resp.data, 'patient');
        console.log(data,"id fu fu")
    })
    // tansactionpost(formData)
  
    api
      .getBloodIssueComponent({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getBillingBloodIssueComponentList();
        setFormData(initialBillingBloodComponentIssueValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Blood Component Billing</h4>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleClickOpen}><i className="fas fa-microscope"></i> &nbsp;Issue Bill</button>
          </div>
          <BloodComponentIssueBillingDialog open={open} handleClose={handleClose} data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit} setFetchData={setFetchData}/>
          <div
            className="ag-theme-balham"
            style={{ height: 800, marginTop: "20px" }}
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

export default withTranslation()(BloodComponentIssueBilling);