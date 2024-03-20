import React from 'react'
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useMemo, useState, useCallback, useRef ,useEffect} from "react"
import OpdVisitDialog from '../OpdDialog/OpdVisitsDialog'
import api from 'services/Api'
import { data } from 'autoprefixer'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import EditButtonRenderer from 'common/data/update-button'
import DeleteButtonRenderer from 'common/data/delete-button'
import OpdVistDetailDialog from '../OpdDialog/OpdVisitDetailDialog'


function Visits() {
  const params = useParams();
  const pid = params?.pid;
  const opdid = localStorage.getItem('opdid')
  console.log(pid, "params");
  const initialVisitValue = {
    cons_doctor: "",
    generated_by: "1",
    organisation_id: "1",
    patient_charge_id: "1",
    transaction_id: "1",
    opd_details_id: "1",
    can_delete: "no",
    payment_mode: "cash",
    symptoms: "",
    appointment_date: "",
    refference: ""
  }

  const [patientid, setPatientid] = useState('')
  const [openVisit, setOpenVisit] = useState(false);
  const [tableData, setTableData] = useState(null)
  const [formData, setFormData] = useState(initialVisitValue);
  const [completeData,setCompleteData] = useState({})
  const [modelOpen,setModelOpen] = useState(false)
  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePatientId = (e) =>{
    const id = e.target.value
    setPatientid(id)

    console.log(id,'idddd')
  }
  useEffect(()=>{
   getOverviewVist()
  },[])
  const getOverviewVist = async () =>{
   const response = await api.get_OPD_OverviewVist(pid,opdid)
   const {data} = response;
   console.log(data,"visit list")
   setTableData(data);
  }

  
    const handleEditClick = async () =>{

    }
    const handleDeleteClick = async () =>{

    }
    const handleView = async (data) =>{
      const opdNumber = data?.opd_NO.replace('OPDN', '');
      const response = await api.get_OPD_VISIT_list(opdNumber)
      console.log(response.data,"can't dude");
      setCompleteData(response?.data[0])
      setModelOpen(true);
    }
    const handleClose = () =>{
      setModelOpen(false)
    }
      const columnDefs = [
        { headerName: 'OPD No', field: 'opd_NO', cellStyle: { fontWeight: 'bold', color: 'black', backgroundColor: '#F1F6F5' }, 
        // cellRenderer: (params) =>
          // const id = params.;
          cellRenderer: (params) => {
            const opd_NO = params.data.opd_NO;
            const opdNumber = opd_NO?.replace('OPDN', '');
            return (
              <a href={`/opdprofileview/${pid}/${opdNumber}`}>
                {"" + opd_NO}
              </a>
            );
          } },
        { headerName: 'Case ID', field: 'case_id' },
        { headerName: 'Appointment Date', field: 'appointment_date' },
        { headerName: 'Consultant', field: 'consultant' },
        { headerName: 'Reference', field: 'refference' },
        {headerName: 'Symptoms', field: 'symptoms'},
        {
          headerName: 'Actions',
          field: 'actions',
          cellRenderer: 'actionsRenderer',
          cellRendererParams: {
            onEditClick: (row) => handleEditClick(row),
            onDeleteClick: (row) => handleDeleteClick(row),
            onView: (row) =>handleView(row)
          },
        },
        // {headerName: 'Previous Medical Issue', field: 'pmi'},
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

      const handleOpenVisit = () => {
        setOpenVisit(true)
      }
    
      const handleCloseVisit = () => {
        setOpenVisit(false)
        localStorage.removeItem("opdid")
      }

      // useEffect(() => {
      //   // getUsers from json
      //   getVisitDetails()
      // }, [])
    
      // const getVisitDetails = () => {
        
      //   // api.getPatient().then(res => setTableData(res.data))
      //   api.getOpdVisits().then(res => {
      //     console.log(res,'response');
      //     setTableData(res.data)})
        
      //   api.http
      // }
    
      // function patientId(e){
      //   console.log(e.target.value,"nameeeeeeeeeeee")
      //   const patientId = e.target.value;
      //   setId(patientId);
      // }
    
      // function handleFormSubmit(event) {
    
      
      //   api.postOpdVisits(formData).then(resp => {
      //     console.log('hiiiiiii');
      //     console.log(resp);
      //     console.log(resp.data, 'patient');

      //   });
      
      //   api
      //     .getOpdVisits({ headers: { "content-type": "application/json" } })
      //     .then(resp => {
      //       getVisitDetails();
      //       setFormData(initialVisitValue);
      //       console.log()
      //       event.preventDefault();
      //     });
      
      //   handleClose();
      // }
      const components = {

        actionsRenderer: (props) => (
          <div>
            <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
            &nbsp;
            <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
           
          <i class="fas fa-eye" style={{color:'blue'}} onClick={()=>props.onView(props.data)}></i>
          </div>
        ),
      };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <button className='btn-mod bg-soft custom-btn' onClick={handleOpenVisit}>
       <i className="fas fa-exchange-alt"></i> 
          &nbsp;Visits
        </button>
        <OpdVisitDialog getOverviewVist={getOverviewVist} open={openVisit} opdid={opdid} handleClose={handleCloseVisit}  data={data} onChange={onChange} handlePatientId={handlePatientId}/>
      </div>
      <div className="ag-theme-alpine mt-4"
            style={{ height: 700 }}>
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
              frameworkComponents={components}
            />
          <OpdVistDetailDialog open={modelOpen} completeData={completeData} handleClose={handleClose}/> 
          </div>
    </div>
        
  )
}

export default Visits