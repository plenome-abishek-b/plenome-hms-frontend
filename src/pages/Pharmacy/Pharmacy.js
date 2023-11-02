import PropTypes from "prop-types";
import React ,{useState, useEffect, useCallback} from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react"; 
import {Link} from 'react-router-dom';
import api from "services/Api";
import PharmacybillDialog from "./Dialog/PharmacyBill";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux

const Pharmacy = props => {
  const initialPharmacybillValues = {
    date: '2023-05-06 18:06:06',
    patient_id: '4',
    ipd_prescription_basic_id: '1',
    case_reference_id: '1',
    generated_by: '1',
    total: '',
    discount: '',
    section:'opd',
    file: '',
    tax: '',
    net_amount: '',
    quantity: '',
    sale_price: '',
    amount: '',
    medicine_batch_detail_id: '1',
    sale_price: '',
    pharmacy_bill_basic_id: '',
    ambulance_call_id: '1',
    appointment_id: '1',
    opd_id: '29',
    ipd_id: '4',
    pathology_billing_id: '1',
    radiology_billing_id: '1',
    blood_donor_cycle_id: '1',
    blood_issue_id: '2',
    created_at: '',
    tax: '',
    tax_percentage: ''
    
  }

  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialPharmacybillValues);
  const [openbill, setOpenbill ] = useState(false);

  console.log(tableData,'tableData');

  const columnDefs = [
    { headerName: 'Bill no', field: 'id', cellStyle: { backgroundColor: '#FFFBAC', color: 'blue', fontWeight: 'bold' },cellRenderer: (params) => {
      const id = params.data.id;
      return (
        <p>
          {"PHAB" + id}
        </p>
      );
    } },
    { headerName: 'Case ID', field: 'case_reference_id' },
    { headerName: 'Patient Name', field: 'patient_id' },
    { headerName: 'Doctor Name', field: 'doctor_name' },
    {headerName: 'Amount(₹)', field: 'net_amount',valueFormatter: params => parseFloat(params.value).toFixed(2),},
    { headerName: 'Paid Amount(₹)', field: 'net_amount',valueFormatter: params => parseFloat(params.value).toFixed(2), },
    { headerName: 'Discount(₹)', field: 'discount',valueFormatter: params => parseFloat(params.value).toFixed(2), },
    {headerName: 'Balance Amount(₹)', field: 'balance'}
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  
  const handleOpenbill = () => {
    setOpenbill(true);
  }

  const handleClosebill = () => {
    setOpenbill(false);
  }


  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

   
  useEffect(() => {
    // getUsers from json
    getPharmacyBills()
  }, [])

  const getPharmacyBills = () => {
    api.getPharmacyBill().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    api.postPharmacyBill(formData).then(resp => {
      console.log(resp)
    })

    api.postPharmacyBillDetails(formData).then(resp => {
      console.log(resp)
    })

    api.postPharmacyBillTransaction(formData).then(resp => {
      console.log(resp)
    })

   

    api
      .getPharmacyBill({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getPharmacyBills()
        setFormData(initialPharmacybillValues)
        preventDefault()
      })
      handleClosebill()
  }

  const onGridReady = useCallback(params => {
    api
      .getPharmacyBill()
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
          <h3>Pharmacy Bill</h3>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <button className="btn btn-primary bg-soft" style={{marginRight: '10px'}} onClick={handleOpenbill}>+ Generate Bill</button>
           <Link to='/medicines'><button className="btn btn-success"><i className="fas fa-plus-square"></i> Medicines</button></Link> 
          </div>
        </Container>
        <PharmacybillDialog open={openbill} handleClose={handleClosebill} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
        <div
          className="ag-theme-balham"
          style={{ height: 500, marginTop: "20px" }}
        >
          <AgGridReact
            rowData={tableData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Pharmacy);