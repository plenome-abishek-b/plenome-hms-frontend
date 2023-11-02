import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function OperationTable() {
    const rowData = [
        {refno: 'OTREF101', date: '12/04', name: 'Tooth Extraction', category: 'ENT and ORAL Surgery', technician: 'David'}
      ];
    
      const columnDefs = [
        { headerName: 'Reference No', field: 'refno', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Operation Date', field: 'date' },
        { headerName: 'Operation Name', field: 'name' },
        { headerName: 'Operation Category', field: 'ctgry' },
        { headerName: 'OT Technician', field: 'technician' }
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
            style={{ height: 100}}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default OperationTable