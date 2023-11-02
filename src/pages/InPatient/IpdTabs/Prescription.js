import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function Prescription() {
    const rowData = [
        {pno: 'IPDP102', date: '12/04', finding: 'Elevated temperature (above 100.4°) The medical community generally defines a fever as a body temperature above 100.4 degrees Fahrenheit. A body temp between 100.4 and 102.2 degree is usually considered a low-grade fever. ',}
      ];
      const [formData,setFormData] = useState([])
    
      const columnDefs = [
        { headerName: 'Prescription No', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Finding', field: 'finding_description' },
        {headerName: 'Action', field: 'action'},
      ];
    useEffect(()=>{
      getPrescriptionDatas()
    },[])
    const getPrescriptionDatas = async () =>{
      const response = await api.getPrescription()
      const {data} = response
      setFormData(data)
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
            style={{ height: 600}}>
            <AgGridReact
              rowData={formData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Prescription