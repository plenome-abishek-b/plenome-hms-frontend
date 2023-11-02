import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef , useEffect } from "react"
import api from 'services/Api'

function Treatment() {
    // const rowData = [
    //     {opdno: '', caseid: '', date: '', symptoms: '', consultant: '', action: ''}
    //   ];

    const [tableData,setTableData] = useState()
    
      const columnDefs = [
        { headerName: 'OPD No', field: 'opd_details_id'},
        { headerName: 'Case ID', field: 'id' },
        { headerName: 'Appointment Date', field: 'appointment_date' },
        { headerName: 'Symptoms', field: 'symptoms' },
        { headerName: 'Consultant', field: 'name' },
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

      useEffect(() => {
        // getUsers from json
        getTreatment()
      }, [])
    
      const getTreatment = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getTreatmentHistory().then(res => {
          console.log(res,'response');
          setTableData(res.data)})
        
        api.http
      }
    

  return (
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 500 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Treatment