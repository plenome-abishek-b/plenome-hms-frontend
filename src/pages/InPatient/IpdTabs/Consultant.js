import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function ConsultantTable() {
  const [consultant,setconsultant] = useState([])
  useEffect(()=>{
   getConsultent()
  },[])
  const getConsultent = async() =>{
  const response = await api.getIpdConsultant()
  const {data} = response
  console.log(data,"consultant response")
  setconsultant(data)
  }
  console.log(consultant,"consultant")
 
    
      const columnDefs = [
        { headerName: 'Applied Date', field: 'date', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Consultant Doctor', field: 'name' },
        { headerName: 'Instruction', field: 'instruction' },
        { headerName: 'Instruction Date', field: 'ins_date' },
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
    
        <div className="ag-theme-alpine"
            style={{ height: 500}}>
              
            <AgGridReact
              rowData={consultant}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default ConsultantTable