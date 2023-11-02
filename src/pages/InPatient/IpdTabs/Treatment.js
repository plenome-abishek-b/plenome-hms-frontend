import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function Treatment() {

      const [formData,setFormData] = useState([])
    
      const columnDefs = [
        { headerName: 'IPD No', field: 'ipd_details_id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        {headerName: 'Symptoms', field: 'symptoms'},
        {headerName: 'Consultant', field: 'name'},
        {headerName: 'Bed', field: 'bed_name'}
      ];
      useEffect(()=>{
       getTreatmentHistory()
      },[])
      const getTreatmentHistory = async () =>{
      const response = await api.getIpdTreatmentHistory()
      const {data} = response
      setFormData(data)
      console.log(data,"get treatment history")
      }
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      );
    

  return (
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 800 }}>
            <AgGridReact
              rowData={formData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Treatment