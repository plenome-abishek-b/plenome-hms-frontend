import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupBloodBankDialog from "../SetupDialog/SetupBloodBankDialog"
import api from "services/Api"
import DeleteButtonRenderer from "common/data/delete-button"
import EditButtonRenderer from "common/data/update-button"
//redux

const SetupBloodBank = props => {

  const initialBloodProductValue = {
    name: '',
    is_blood_group: '',
    created_at: '2023-09-08 11:11:11'
  }

  const [formData, setFormData] = useState(initialBloodProductValue);
  const [tableData, setTableData] = useState();
  const [openBbDialog, setOpenBbDialog] = useState(null);
  const [selectedData,setSelectedData] = useState({})
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenBbDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetup_bloodBank(data.id)
         getBloodProduct()
   }else{
    console.log("cancelled");
   }
  
   }
  const columnDefs = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Type', field: 'label'},
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenBb = () => {
    setSelectedData({})
    setOpenBbDialog(true)
  }

  const handleCloseBb = () => {
    setOpenBbDialog(false)
  }

  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
    // setFormData1({ ...formData1, [id]: value })
  }

  useEffect(() => {
    // getUsers from json
    getBloodProduct()
  }, [])

  const getBloodProduct = async () => {
    const response = await api.getSetup_bloodBankall()
    const {data} = response;
    const mappedResponse = data.map(item => {
      if (item.is_blood_group === 1) {
        return { ...item, label: 'Blood Group' };
      } else if (item.is_blood_group === 0) {
        return { ...item, label: 'Component' };
      } else {
        return { ...item, label: 'Unknown' }; // You can handle other cases as needed
      }
    });
    console.log(mappedResponse,"consoling");

    setTableData(mappedResponse)
  }

  
  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Products List</h4>
          <Card>
            <CardBody>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-mod bg-soft" onClick={handleOpenBb}>
                  <i className="fa fa-plus"></i>&nbsp; Add Products
                </button>
              </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={tableData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <SetupBloodBankDialog selectedData={selectedData} getBloodProduct={getBloodProduct} open={openBbDialog} handleClose={handleCloseBb}/>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupBloodBank)
