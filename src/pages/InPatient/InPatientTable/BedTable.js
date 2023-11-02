import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function BedTable() {
    const rowData = [
        {bgroup: 'VIP Ward', bed: 'GF - 100', fdate: '12/04', tdate: '', abed: 'Yes'}
      ];
    
      const columnDefs = [
        { headerName: 'Bed Group', field: 'bgroup', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Bed', field: 'bed' },
        { headerName: 'From Date', field: 'fdate' },
        { headerName: 'To Date', field: 'tdate' },
        { headerName: 'Active Bed', field: 'abed' }
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
            style={{ height: 100 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default BedTable