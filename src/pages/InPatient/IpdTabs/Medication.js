import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function Medication() {
    const rowData = [
        {date: '12/04', mname: 'Alprovit', dose1: 'Time: 11:35 PM 1(ML)', dose2: 'Time: 12.00 PM 1(ML)', dose3: ''}
      ];
      const [medicationData,setMedicationData] = useState([])
    
      const columnDefs = [
        { headerName: 'Date', field: 'date', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Medicine Name', field: 'medicine_name' },
        { headerName: 'Dose', field: 'dosage' },
      ];
      const {ipdno} = useParams()
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      );
      useEffect(()=>{
        getMedicationDetails()
      },[])
      const getMedicationDetails = async() =>{
        const response = await api.getMedication(ipdno)
        const {data} = response
        setMedicationData(data)
        console.log(data,"response of medication")
      }
    

  return (
    
        <div className="ag-theme-alpine"
            style={{ height: 600}}>
            <AgGridReact
              rowData={medicationData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default Medication