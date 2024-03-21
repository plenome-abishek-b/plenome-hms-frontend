import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef , useEffect } from "react"
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function Treatment() {
    // const rowData = [
    //     {opdno: '', caseid: '', date: '', symptoms: '', consultant: '', action: ''}
    //   ];
    const params = useParams()
     const pid = params?.pid
    const [tableData,setTableData] = useState()
    
      const columnDefs = [
        { headerName: 'OPD No', field: 'OPD_ID'}, 
        { headerName: 'Case ID', field: 'case_id' },
        { headerName: 'Appointment Date', field: 'appointment_date' },
        { headerName: 'Symptoms', field: 'symptoms' },
        { headerName: 'Consultant', field: 'consultant_doctor' },
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
    
      const getTreatment = async () => {
        const response = await api.getTreatmentHistory_OPD(pid);
        const {data} = response;
        console.log(data,"treatment history")
        setTableData(data)
      }
    

  return (
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 500 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
  )
}

export default Treatment