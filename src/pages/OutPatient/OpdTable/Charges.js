import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"


function Charges() {


  const rowData = [
    { name: '', ctype: '', scharge: '', tax: '', appchrg: '', amt: '' }
  ];

  const columnDefs = [
    { headerName: 'Name', field: 'name', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
    { headerName: 'Charge Type', field: 'ctype' },
    { headerName: 'Standard Charge()', field: 'scharge' },
    { headerName: 'Tax', field: 'tax' },
    { headerName: 'Applied Charge()', field: 'appchrg' },
    { headerName: 'Amount()', field: 'amt' }
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
      style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>

  )
}

export default Charges