import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef , useEffect } from "react"
import OpdChargeDialog from '../OpdDialog/OpdChargeDialog'
import api from 'services/Api'

function OpdCharges() {


  const initialChargeValue = {
    created_at: "2023-02-02 11:11:11",
    opd_id: "1",
    ipd_id: "4",
    charge_id: "1",
    apply_charge: "10.00",
    category: ""
      }

  const [openDialog, setOpenDialog] = useState(false);
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialChargeValue)


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


    // const rowData = [
    //     {date: '', name: '', ctype: '', ccategory: '', qty: '', charge: '', tpa: '',tax: '', appchrg: '', amt: '', action:''}
    //   ];
    
      const columnDefs = [
        { headerName: 'Date', field: 'date' },
        {headerName: 'Name', field: 'name'},
        {headerName: 'Charge Type', field: 'charge_type'},
        {headerName: 'Charge Category', field: 'category_name'},
        {headerName: 'Qty', field: 'qty'},
        {headerName: 'Standard Charge(₹)', field:'standard_charge'},
        {headerName: 'TPA Charge(₹)', field: 'tpa_charge'},
        {headerName: 'Tax', field: 'tax'},
        {headerName: 'Applied Charge(₹)', field: 'apply_charge'},
        {headerName: 'Amount(₹)', field: 'amount'}
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


      const handleOpenCharge = () => {
        setOpenDialog(true)
      }
    
      const handleCloseCharge = () => {
        setOpenDialog(false)
      }
    
      useEffect(() => {
        // getUsers from json
        getCharges()
      }, [])
    
      const getCharges = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getOpdCharges().then(res => {
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
      
        api.postOpdCharges(formData).then(resp => {
          console.log(resp);
          console.log(resp.data, 'patient');
        });
    
        // api.postOpdVisits(formData).then(resp => {
        //   console.log(resp);
        //   console.log(resp.data, 'patient');
        // });
      
        api
          .getOpdCharges({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getCharges();
            setFormData(initialChargeValue);
            console.log()
            event.preventDefault();
          });
      
        handleClose();
      }

  return (

    <div >
    <div className='d-flex justify-content-end'>
    <button className="btn btn-primary" onClick={handleOpenCharge}>+ Add Charges</button>
    </div>
     
      <OpdChargeDialog open={openDialog} handleClose={handleCloseCharge} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
        <div className="ag-theme-alpine mt-4"
            style={{ height: 500 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
          </div>
  )
}

export default OpdCharges