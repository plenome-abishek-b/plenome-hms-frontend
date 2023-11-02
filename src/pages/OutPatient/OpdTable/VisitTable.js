import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"

function VisitTable() {
    const rowData = [
        {opdno:'OPDN100', caseid: '2023', date: '12/04', consultant: 'Reyan Jain', ref: '', symptoms: ''}
      ];
    
      const columnDefs = [
        { headerName: 'OPD No', field: 'opdno', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' }, cellRenderer: (params) => {
            const opdno = params.data.opdno;
            return (
              <a href={`/opdprofileview`}>
                {opdno}
              </a>
            );
          } },
        { headerName: 'Case ID', field: 'caseid' },
        { headerName: 'Appointment Date', field: 'date' },
        { headerName: 'Consultant', field: 'consultant' },
        { headerName: 'Reference', field: 'ref' },
        {headerName: 'Symptoms', field: 'symptoms'}
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

export default VisitTable