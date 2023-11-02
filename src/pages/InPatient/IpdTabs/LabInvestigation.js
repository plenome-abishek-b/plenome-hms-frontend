import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function LabInvestigation() {
    const rowdata = [
        {tname: 'Chest X-Rays(c)', lab: 'Pathology', sample: 'Belina Turner', date: '12/04', approved: 'Reyan Jain', action: ''}
      ];
      const [formData,setFormData] = useState([])
      useEffect(()=>{
      getLabInvestigation()
      },[])
      const getLabInvestigation = async () =>{
       const response = await api.getLabInvestigation()
       const {data} = response
       console.log(data,"form data of lab")
       setFormData(data)
      }
    
      const columnDefs = [
        { headerName: 'Test Name', field: 'test_name', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        // { headerName: 'Lab', field: 'lab' },
        { headerName: 'Sample Collected', field: 'name' },
        { headerName: 'Expected Date', field: 'reporting_date' },
        { headerName: 'Approved By', field: 'name' },
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
    

  return (
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 600}}>
            <AgGridReact
              rowData={formData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default LabInvestigation