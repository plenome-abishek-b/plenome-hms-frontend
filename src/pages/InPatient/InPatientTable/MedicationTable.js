import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function MedicationTable() {
    const rowData = [
        {date: '12/04', mname: 'Alprovit', dose: '1(ML)', time: '09.30', remark: ''}
      ];
    
      const columnDefs = [
        { headerName: 'Date', field: 'date', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Medicine Name', field: 'mname' },
        { headerName: 'Dose', field: 'dose' },
        { headerName: 'Time', field: 'time' },
        { headerName: 'Remark', field: 'remark' }
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

export default MedicationTable