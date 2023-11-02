import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef,useEffect } from "react"
import OpdOperationDialog from '../OpdDialog/OpdOperationDialog'
import api from 'services/Api'

function OperationTable() {


  const initialOperationValue = {
    operation_id: "1",
    created_at: "2023-02-02 11:11:11",
    opd_details_id: "6",
    ipd_details_id: "5",
    consultant_doctor: "2",
    generated_by: "1",
      }

  const [openOperationDialog, setOpenOperationDialog] = useState(false)
  const [tableData,setTableData] = useState()
  const [formData, setFormData] = useState(initialOperationValue)


  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }


  // const rowData = [
  //   { refno: 'OTREF101', date: '12/04', name: 'Tooth Extraction', category: 'ENT and ORAL Surgery', technician: 'David', action: '' }
  // ];

  const columnDefs = [
    { headerName: 'Reference No', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
    { headerName: 'Operation Date', field: 'date' },
    { headerName: 'Operation Name', field: 'o_name' },
    { headerName: 'Operation Category', field: 'o_category' },
    { headerName: 'OT Technician', field: 'ot_technician' }
    // { headerName: 'Action', field: 'action' }
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  const handleOpenOperationDialog = () => {
    setOpenOperationDialog(true)
  }

  const handleCloseOperationDialog = () => {
    setOpenOperationDialog(false)
  }

  useEffect(() => {
    // getUsers from json
    getOperations()
  }, [])

  const getOperations = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getOpdOperation().then(res => {
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
  
    api.postOpdOperation(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });
  
    api
      .getOpdOperation({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getOperations();
        setFormData(initialOperationValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }


  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={handleOpenOperationDialog} style={{ height: '35px' }}>
          + Add Operation
        </button>
        <OpdOperationDialog open={openOperationDialog} handleClose={handleCloseOperationDialog} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
      </div>
      <div className="ag-theme-alpine mt-3"
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

export default OperationTable