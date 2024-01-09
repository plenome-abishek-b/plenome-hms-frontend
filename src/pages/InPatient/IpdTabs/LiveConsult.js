import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function Liveconsult() {
    const rowData = [
        {ctitle: 'Eye Problems', date:'12/04', cby: 'self', cfor: 'Reyan Jain', patient: 'Perry Tonitus'}
      ];
    
      const columnDefs = [
        { headerName: 'Consultation Title', field: 'ctitle', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Created By', field: 'cby' },
        { headerName: 'Created For', field: 'cfor' },
        { headerName: 'Patient', field: 'patient' },
        {headerName: 'Status', field: 'status'}
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
            style={{ height: 100}}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
  )
}

export default Liveconsult