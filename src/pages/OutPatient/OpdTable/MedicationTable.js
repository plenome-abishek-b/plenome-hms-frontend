import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef ,useEffect} from "react"
import OpdMedicationDialog from '../OpdDialog/OpdMedicationDialog'
import api from 'services/Api'

function MedicationTable() {

  const initialMedicationValue = {
    date: "",
    time: "",
    medicine_category: "",
    medicine_name: "",
    dosage: "",
    remark: "",
    created_at: "2023-02-02 11:11:11",
    generated_by: "1",
    pharmacy_id: "1",
    ipd_id: "4",
    opd_details_id: "235",
    medicine_dosage_id: "1"
      }
    
  const [tableData,setTableData] = useState()
  const [openMedDialog, setOpenMedDialog] = useState(false)
  const [formData, setFormData] = useState(initialMedicationValue)

  
  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  const handleOpenMed = () => {
    setOpenMedDialog(true)
  }

  const handleCloseMed = () => {
    setOpenMedDialog(false)
  }
  const columnDefs = [
    { headerName: 'Date', field: 'date', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
    { headerName: 'Medicine Name', field: 'medicine_name' },
    { headerName: 'Dose 1', field: 'dosage' }
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
    getMedications()
  }, [])

  const getMedications = () => {
    
    // api.getPatient().then(res => setTableData(res.data))
    api.getOpdMedication().then(res => {
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
  
    api.postOpdMedication(formData).then(resp => {
      console.log(resp);
      console.log(resp.data, 'patient');
    });

    // api.postOpdVisits(formData).then(resp => {
    //   console.log(resp);
    //   console.log(resp.data, 'patient');
    // });
  
    api
      .getOpdMedication({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getMedications();
        setFormData(initialMedicationValue);
        console.log()
        event.preventDefault();
      });
  
    handleClose();
  }
  


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary mb-3" onClick={handleOpenMed}>+ Add Medication</button>
        <OpdMedicationDialog open={openMedDialog} handleClose={handleCloseMed} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
      </div>
      <div className="ag-theme-alpine"
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

export default MedicationTable