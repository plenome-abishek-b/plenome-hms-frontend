import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function LabTable() {
    const rowData = [
        {tname: 'Chest X-Rays(c)', lab: 'Pathology', sample: 'Belina Turner', date: '12/04', approved: 'Reyan Jain'}
      ];
    
      const columnDefs = [
        { headerName: 'Test Name', field: 'tname', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Lab', field: 'lab' },
        { headerName: 'Sample Collected', field: 'sample' },
        { headerName: 'Expected Date', field: 'date' },
        { headerName: 'Approved By', field: 'approved' }
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

export default LabTable