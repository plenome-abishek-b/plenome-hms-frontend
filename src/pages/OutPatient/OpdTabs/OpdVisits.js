import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function OpdVisits() {
    const rowData = [
        {opdid: 'CHKID201', date: '13/04', consultant: 'Reyan Jain', ref: '', symptoms: '', action:''}
      ];
    
      const columnDefs = [
        { headerName: 'OPD Checkup ID', field: 'opdid', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Appointment Date', field: 'date' },
        { headerName: 'Consultant', field: 'consultant' },
        { headerName: 'Reference', field: 'ref' },
        {headerName: 'Symptoms', field: 'symptoms'},
        {headerName: 'Action', field: 'action'}
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
            style={{ height: 100 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default OpdVisits