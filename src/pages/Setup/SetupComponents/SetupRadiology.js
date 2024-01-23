import PropTypes from "prop-types"
import React ,{useMemo, useState, useEffect} from "react"
import { Container, Card, CardBody } from "reactstrap"
//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import RadiologyCategoryDialog from "../SetupDialog/SetupRadiologyDialog"
import api from "services/Api"
import EditButtonRenderer from "common/data/update-button"
import DeleteButtonRenderer from "common/data/delete-button"
//redux

const Setupradilogy = props => {

    const [openSetupMedicineCategory, setOpenSetupMedicineCategory] = useState()
    const [tableData, setTableData] = useState();
    const [data,setData] = useState([])
    const [selectedData,setSelectedData] = useState({})
   const handleEditClick = (data) =>{
    console.log(data,"edit");
    setSelectedData(data)
    // setSelectedData()
    setOpenSetupMedicineCategory(true)
   }
   const handleDeleteClick = async (data) =>{
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');
           console.log(userConfirmed,"delete");
   if(userConfirmed){
         const deleteResponse = await api.deleteSetupRadiologyCategory(data.id)
         getRadiologyCategory()
   }else{
    console.log("cancelled");
   }

   }
    const columnDefs = [
      { headerName: 'Category Name', field: 'lab_name' },
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


   

  const handleOpenMedicineCategory = () => {
    setSelectedData({})
    setOpenSetupMedicineCategory(true);
  }

  const handleCloseMedicineCategory = () => {
    setOpenSetupMedicineCategory(false);
  }

  useEffect(() => {
    // getUsers from json
    getRadiologyCategory()
  }, [])

 const getRadiologyCategory = async () =>{
    const response = await api.getSetupRadiologyCategory()
    const {data} = response
    setData(data)
    console.log(data,"data we")
 }

  // function handleFormSubmit() {
  //   //for posting and getting data at a sametime
  //   api.postPharmacyCtgry(formData).then(resp => {
  //     console.log(resp)
  //   })
  //   handleClose()

  //   api
  //     .getPharmacyCtgry({ headers: { "content-type": "application/json" } })
  //     .then(resp => {
  //       getChrgCategory()
  //       setFormData(initialMedCategoryValue)
  //       preventDefault()
  //     })
  // }
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
          <h4>Radiology category list</h4>
          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn-mod bg-soft" onClick={handleOpenMedicineCategory}><i className="fa fa-plus"></i>&nbsp; Add Radiology Category</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={data}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  frameworkComponents={components}
                />
                <RadiologyCategoryDialog selectedData={selectedData} getRadiologyCategory={getRadiologyCategory} open={openSetupMedicineCategory} handleClose={handleCloseMedicineCategory} />
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Setupradilogy)
