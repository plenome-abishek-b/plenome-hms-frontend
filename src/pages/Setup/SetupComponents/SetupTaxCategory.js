import PropTypes from "prop-types"
import React, { useMemo, useState, useEffect } from "react"
import { Container, Card, CardBody } from "reactstrap"
 
//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import SetupTaxCategoryDialog from "../SetupDialog/SetupTaxCategoryDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
 
 
const setupTaxCategory = props => {
  const initialTaxValue = {
    name: '',
    percentage: '',
    created_at: '2023-06-05 11:11:11'
  }
 
  const [openTaxCategoryDialog, setOpenTaxCategoryDialog] = useState();
  const [tableData, setTableData] = useState(null);
  const [selectedData,setSelectedData] = useState({});
  const [formData, setFormData] = useState(initialTaxValue);
  const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenTaxCategoryDialog(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteTaxCategory(data.id)
         getTax()
   }else{
    console.log("cancelled");
   }
  }
 
 
  const columnDefs = [
    { headerName: "Name", field: "name" },
    {
      headerName: "Percentage",
      field: "percentage",
      valueGetter: ({ data }) => data.percentage.toFixed(2) + "%"
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionsRenderer',
      cellRendererParams: {
        onEditClick: (row) => handleEditClick(row),
        onDeleteClick: (row) => handleDeleteClick(row),
      },
    },
  ];
 
 
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )
 
 
  const onChange = e => {
    //catch the parameters when changed.
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }
 
  const handleOpenTaxCategory = () => {
    setSelectedData({name:'',percentage:''})
    setOpenTaxCategoryDialog(true);
  }
 
  const handleCloseTaxCategory = () => {
    setOpenTaxCategoryDialog(false);
  }
 
   useEffect(() => {
    // getUsers from json
    getTax()
  }, [])
 
  const getTax = () => {
    api.getTaxCategory().then(res => setTableData(res.data))
    api.http
  }
 
  function handleFormSubmit() {
    //for posting and getting data at a sametime
    api.postTaxCategory(formData).then(resp => {
      console.log(resp)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    handleClose()
 
    api
      .getTaxCategory({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getTax()
        setFormData(initialTaxValue)
        preventDefault()
      })
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
          <h4>Tax Category List</h4>
          <Card>
            <CardBody>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-primary bg-soft" onClick={handleOpenTaxCategory}>
                    <i className="fa fa-plus"></i>&nbsp; Add Tax Category
                  </button>
                </div>
                <div
                  className="ag-theme-material"
                  style={{height: 500, marginTop: "20px" }}
                >
                  <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                  frameworkComponents={components}
                  />
                  <SetupTaxCategoryDialog getTaxCategory={getTax} selectedData={selectedData} open={openTaxCategoryDialog} handleClose={handleCloseTaxCategory} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
 
export default withTranslation()(setupTaxCategory)