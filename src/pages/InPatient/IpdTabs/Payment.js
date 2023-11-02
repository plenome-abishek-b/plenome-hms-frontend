import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef } from "react"
import { useEffect } from 'react'
import api from 'services/Api'
import { useParams } from 'react-router-dom/cjs/react-router-dom'

function Payment({patient}) {
  const [patientId,setPatintId] = useState({})
  const [datas,setData] =useState([])
  
  const {ipdno} = useParams()
   
    
      const columnDefs = [
        { headerName: 'Transaction ID', field: 'id', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' } },
        { headerName: 'Date', field: 'payment_date' },
        { headerName: 'Note', field: 'note' },
        { headerName: 'Payment Mode', field: 'payment_mode' },
        { headerName: 'Paid Amount(₹)', field: 'amount' },
        // {headerName: 'Action', field: 'action'}
      ];
    
      const defaultColDef = useMemo(
        () => ({
          sortable: true,
          filter: true,
          flex: 1,
        }),
        []
      );
      const fetchPatient =()=>{
        if(patient && patient.length > 0){
          patient.map(async(val)=>{
            console.log(val.patient_id,"ppa")
            setPatintId(val.patient_id)
          await  fetchPayment(val.patient_id)
            // setTimeout(()=>{
            // },1000)
        })
        }
      }
      
      // useEffect(()=>{
      //   fetchPatient()
      // },[patient])
      // const section = 'IPD'
      // const fetchPayment = async (patientId) =>{
      //   const patients = patientId
      //   const response = await api.getPaymet(patients,section)
      //   const {data} = response 
      //   console.log(data,"fetchPayment")
      //   if (data && data.length > 0) {
      //      setData(data);
      //   }
      //   // setPayment(data)
      //   }
      useEffect(()=>{
        getPayment()
      },[])
      const getPayment = async () =>{
               const response = await api.getPaymet()
        const {data} = response 
        console.log(data,"fetchPayment")
        if (data && data.length > 0) {
           setData(data);
        }
      }
        // const updatePayment = async (data) => {
        //   // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a delay of 1 second
        //   setPayment(data);
        // };

        console.log(datas,"ll")
      
  return (
    
        <div className="ag-theme-alpine mt-4"
            style={{ height: 1000 }}>
{console.log(datas,"ddd")}
            <AgGridReact
              rowData={datas}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
  )
      // }
       
}

export default Payment