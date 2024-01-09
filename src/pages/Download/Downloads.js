import PropTypes from "prop-types";
import React , {useState , useEffect} from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import DownloadDialog from "./DownloadDialog";
import api from "services/Api";

//redux

const Downloads = props => {

    const initialDownloadCenterValue = {
        title: "",
        type: "",
        date: "",
        file: "",
        note: "",
        created_at: "2023-09-08 11:11:11"
      }



    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null)
    const [formData, setFormData] = useState(initialDownloadCenterValue)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = e => {
        //catch the parameters when changed.
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
        // setFormData1({ ...formData1, [id]: value })
      }


   
    const columnDefs = [
        { headerName: 'Content Title', field: 'title' },
        { headerName: 'file type', field: 'type' },
        { headerName: 'Date', field: 'date' },
        { headerName: 'Description', field: 'note' },
        // {
        //     headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
        //         <button className="btn btn-danger btn-sm" onClick={() => handleDelete(params.value)}>
        //             Delete
        //         </button>
        //     </div>
        // }
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
        getDownloadDetails()
      }, [])
    
      const getDownloadDetails = () => {
        
        // api.getPatient().then(res => setTableData(res.data))
        api.getDownloadCenterDetails().then(res => {
          console.log(res,'response');
          setTableData(res.data)})
        
        api.http
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
      
        api.postDownloadCenterDetails(formData).then(resp => {
          console.log(resp);
          console.log(resp.data, 'patient');
        });
    
        api
          .getDownloadCenterDetails({ headers: { "content-type": "application/json" } })
          .then(resp => {
            getDownloadDetails();
            setFormData(initialDownloadCenterValue);
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
                        title={props.t("Download Center")}
                        breadcrumbItem={props.t("Downloads")}
                    />
                    <div style={{display:'flex',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <button className="btn-mod" onClick={handleClickOpen}>Add File</button>
                    </div>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: 500, marginTop: "20px" }}
                    >
                        <AgGridReact
                            rowData={tableData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                    <DownloadDialog 
                        open={open}
                        handleClose={handleClose}
                        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(Downloads);
