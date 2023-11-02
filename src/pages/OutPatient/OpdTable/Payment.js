import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef,useEffect } from "react"
import api from 'services/Api'
import OpdPaymentDialog from '../OpdDialog/OpdPaymentDialog'

const Payment = props => {

  const initialPaymentValue = {
    section: "OPD",
    created_at: "2023-02-02 11:11:11",
    appointment_id: "1",
    case_reference_id: "1",
    opd_id: "1",
    ipd_id: "4",
    payment_date: "",
    note: "",
    payment_mode: "",
    amount: "",
    pharmacy_bill_basic_id: "1",
    pathology_billing_id: "1",
    radiology_billing_id: "1",
    blood_donor_cycle_id: "1",
    blood_issue_id: "2"
  }

  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialPaymentValue)
  const [openPayDialog, setOpenPayDialog] = useState(false)

    
      const columnDefs = [
        { headerName: 'Transaction ID', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'payment_date' },
        { headerName: 'Note', field: 'note' },
        { headerName: 'Payment Mode', field: 'payment_mode' },
        { headerName: 'Paid Amount(₹)', field: 'amount' }
        // {headerName: 'Action', field: 'action'}
      ];
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      );

      const handleOpenPayment = () => {
        setOpenPayDialog(true)
      }
    
      const handleClosePayment = () => {
        setOpenPayDialog(false)
      }
    

      const onChange = (e) => {
        console.log(e.target.value,"lllll")
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    


      useEffect(() => {
        // getUsers from json
        getPaymentDetails()
      }, [])
    
      const getPaymentDetails = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getOpdPayment().then(res => {
          console.log(res,'response');
          setTableData(res.data)})
        
        api.http
      }
    
      // function patientId(e){
      //   console.log(e.target.value,"nameeeeeeeeeeee")
      //   const patientId = e.target.value;
      //   setId(patientId);
      // }
    
      function handleFormSubmit(event) {
    
      
        api.postOpdPayment(formData).then(resp => {
          console.log('hiiiiiii');
          console.log(resp);
          console.log(resp.data, 'patient');

        });
      
        api
          .getOpdPayment({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getPaymentDetails();
            setFormData(initialPaymentValue);
            console.log()
            event.preventDefault();
          });
      
        handleClose();
      }

      // const onGridReady = useCallback(params => {
      //   api
      //     .getOpdPayment()
      //     .then(resp => resp.data())
      //     .then(data => {
      //       setRowData(data)
      //     })
      // }, [])

  return (
        <div>
          <button className="btn btn-primary" onClick={handleOpenPayment}>+ Add Payment</button>
            <OpdPaymentDialog open={openPayDialog} handleClose={handleClosePayment} onChange={onChange} data={formData} handleFormSubmit={handleFormSubmit}/>
          <div className="ag-theme-alpine mt-4"
            style={{ height: 700 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              // onGridReady={onGridReady}
            />
          </div>
        </div>
        
  )
}

export default Payment