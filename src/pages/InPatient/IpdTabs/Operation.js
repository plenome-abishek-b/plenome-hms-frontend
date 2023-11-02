import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'

function Operation() {
  const [operation,setOperation] = useState([])
    
      const columnDefs = [
        { headerName: 'Reference No', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Operation Date', field: 'date' },
        { headerName: 'Operation Name', field: 'o_name' },
        { headerName: 'Operation Category', field: 'o_category' },
        { headerName: 'OT Technician', field: 'ot_technician'},
        {headerName: 'Action', field: 'action'}
      ];
      useEffect(()=>{
         getOperations()
      },[])
       const getOperations = async () =>{ 
         const response = await api.getOperation()
         const {data} = response
         console.log(data,"operation response")
         setOperation(data)
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
              rowData={operation}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Operation