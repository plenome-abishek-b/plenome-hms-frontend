import PropTypes from "prop-types";
import React , {useState,useEffect}from "react";
import { Container } from "reactstrap";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import PathologyDialog from "./PathologyDialog";
import api from "services/Api";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux

const pathologyTest = props => {

    const initialPathologyValue = {
        test_name: "",
        short_name: "",
        test_type: "",
        sub_category: "",
        report_days: "",
        method: "",
        charge_id: "1",
        unit:'',
        reference_range:'',
        pathology_category_id: "1",
        created_at: "2023-02-02 11:11:11"
          }

    const [open, setOpen] = React.useState(false);
    const [tableData,setTableData] = useState()
    const [formData, setFormData] = useState(initialPathologyValue)

    const onChange = e => {
        //catch the parameters when changed.
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
        // setFormData1({ ...formData1, [id]: value })
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const rowData = [
    //     { testname: 'Chest X-Ray', testtype: 'X-ray', category: 'Clinical microbilogy', method: 'Imaging test', rpt: '1day', Amount: '200' }
    // ];

    const columnDefs = [
        { headerName: 'Test Name', field: 'test_name' , cellStyle: {backgroundColor: '#FFFBAC', fontWeight: 'bold'}},
        { headerName: 'Short Name', field: 'short_name' },
        { headerName: 'Test Type', field: 'test_type' },
        { headerName: 'Category', field: 'category_name' },
        { headerName: 'Sub Category', field: 'sub_category' },
        { headerName: 'Method', field: 'method' },
        { headerName: 'Report Days', field: 'report_days' },
        { headerName: 'Tax(%)', field: 'percentage'},
        { headerName: 'Charge($)', field: 'standard_charge'},
        // { headerName: 'Amount($)', field: 'standard_charge'}
    ];

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: true,
            flex: 1,
        }),
        []
    );


    useEffect(() => {
        // getUsers from json
        getPathologyTestList()
      }, [])
    
      const getPathologyTestList = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getPathologyTest().then(res => {
          console.log(res,'response');
          setTableData(res.data)})
        
        api.http
      }


      function patientId(e){
        console.log(e.target.value,"nameeeeeeeeeeee")
        const patientId = e.target.value;
        setId(patientId);
      }
    
      function handleFormSubmit(event) {
    
        // const payload = {
        //   case_reference_id: "1",
        //   patient_id: id, // Assign the patient ID to the patient_id field
        //   generated_by: "1",
        //   is_ipd_moved: "no",
        //   discharged: "2023-04-25 14:07:22",
        //   created_at: ""
        // };
      
        api.postPathologyTest(formData).then(resp => {
          console.log(resp);
          console.log(resp.data, 'patient');
        });
    
        // api.postOpdVisits(formData).then(resp => {
        //   console.log(resp);
        //   console.log(resp.data, 'patient');
        // });
      
        api
          .getPathologyTest({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getPathologyTestList();
            setFormData(initialPathologyValue);
            console.log()
            event.preventDefault();
          });
      
        handleClose();
      }



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={props.t("Pathology Test")}
                        breadcrumbItem={props.t("Pathology Test")}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}> <button className='btn btn-outline-primary' onClick={handleClickOpen}>
                        <i className="fas fa-bong"></i>&nbsp; Add Pathology Test
                    </button></div>
                    <div className="ag-theme-alpine"
                        style={{ height: 700, marginTop: "20px" }}>
                        <AgGridReact
                            rowData={tableData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        />
                        <PathologyDialog
                            open={open}
                            handleClose={handleClose}
                            data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}
                        />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};


export default withTranslation()(pathologyTest);