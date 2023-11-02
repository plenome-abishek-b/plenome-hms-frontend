import React, { useEffect } from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function PaymentTable({patient}) {
  const [patientId,setPatintId] = useState({})
  const [payment,setPayment] =useState([])
  console.log(patientId,"ppp")

    
      const columnDefs = [
        { headerName: 'Transaction ID', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Note', field: 'note' },
        { headerName: 'Payment Mode', field: 'amount_type' },
        { headerName: 'Paid Amount(₹)', field: 'amount' }
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
      const fetchPatient =()=>{
        if(patient.length > 0){
          patient.map((val)=>{
            console.log(val.patient_id,"ppa")
            setPatintId(val.patient_id)
            setTimeout(()=>{
              fetchPayment(patientId)
            },1000)
        })
        }
      }
      useEffect(()=>{
        fetchPatient()
      },[patient])
      const section = 'IPD'
      const fetchPayment = async (patientId) =>{
        const patients = patientId
        const response = await api.getPaymet(patients,section)
        const {data} = response
        setPayment(data)
        console.log(data,"fetchPayment")
        } 

  return (
    
        <div className="ag-theme-alpine"
            style={{ height: 800 }}>
            <AgGridReact
              rowData={payment}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
}

export default PaymentTable