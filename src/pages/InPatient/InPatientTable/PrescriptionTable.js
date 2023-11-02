import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function PrescriptionTable() {
    const rowData = [
        {pno: 'IPDP101', date: '12/04', finding: 'Elevated temperature (above 100.4°) The medical community generally defines a fever as a body temperature above 100.4 degrees Fahrenheit. A body temp between 100.4 and 102.2 degree is usually considered a low-grade fever. '}
      ];
    
      const columnDefs = [
        { headerName: 'Prescription No', field: 'pno', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Finding', field: 'finding' },
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

export default PrescriptionTable