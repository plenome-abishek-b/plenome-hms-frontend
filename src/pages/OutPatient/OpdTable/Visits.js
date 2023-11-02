import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef ,useEffect} from "react"
import OpdVisitDialog from '../OpdDialog/OpdVisitsDialog'
import api from 'services/Api'
import { data } from 'autoprefixer'


function Visits() {

  const initialVisitValue = {
    cons_doctor: "",
    generated_by: "1",
    organisation_id: "1",
    patient_charge_id: "1",
    transaction_id: "1",
    opd_details_id: "1",
    can_delete: "no",
    payment_mode: "cash",
    symptoms: "",
    appointment_date: "",
    refference: ""
  }

  const [patientid, setPatientid] = useState('')
  const [openVisit, setOpenVisit] = useState(false);
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialVisitValue)

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePatientId = (e) =>{
    const id = e.target.value
    setPatientid(id)

    console.log(id,'idddd')
  }

  
    
      const columnDefs = [
        { headerName: 'OPD No', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' }, cellRenderer: (params) => {
          const id = params.data.id;
          return (
            <a href={`/opdprofileview`}>
              {"OPDN" + id}
            </a>
          );
        } },
        { headerName: 'Case ID', field: 'case_id' },
        { headerName: 'Appointment Date', field: 'appointment_date' },
        { headerName: 'Consultant', field: 'cons_doctor' },
        { headerName: 'Reference', field: 'refference' },
        {headerName: 'Symptoms', field: 'symptoms'},
        // {headerName: 'Previous Medical Issue', field: 'pmi'},
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

      const handleOpenVisit = () => {
        setOpenVisit(true)
      }
    
      const handleCloseVisit = () => {
        setOpenVisit(false)
      }

      useEffect(() => {
        // getUsers from json
        getVisitDetails()
      }, [])
    
      const getVisitDetails = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getOpdVisits().then(res => {
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
    
      
        api.postOpdVisits(formData).then(resp => {
          console.log('hiiiiiii');
          console.log(resp);
          console.log(resp.data, 'patient');

        });
      
        api
          .getOpdVisits({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getVisitDetails();
            setFormData(initialVisitValue);
            console.log()
            event.preventDefault();
          });
      
        handleClose();
      }
    

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <button className='btn btn-primary bg-soft' onClick={handleOpenVisit}>
       <i className="fas fa-exchange-alt"></i> 
          &nbsp;Visits
        </button>
        <OpdVisitDialog open={openVisit} handleClose={handleCloseVisit} handleFormSubmit={handleFormSubmit} data={data} onChange={onChange} handlePatientId={handlePatientId}/>
      </div>
      <div className="ag-theme-alpine mt-4"
            style={{ height: 300 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
    </div>
        
  )
}

export default Visits