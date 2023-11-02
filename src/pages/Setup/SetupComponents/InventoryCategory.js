import PropTypes from "prop-types"
import React ,{useMemo, useState} from "react"
import { Container, Card, CardBody } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import SetupOperationCategoryDialog from "../SetupDialog/SetupOperationCategoryDialog"
import SetupInventoryCategoryDialog from "../SetupDialog/SetupInventoryCategoryDialog"
import { useEffect } from "react"
import api from "services/Api"

const SetupInventoryCategory = props => {

  const [openSetupOperationDialog, setOpenSetupOperationDialog] = useState();
  const [categoryData,setCategoryData] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [formValue,setFormValue] = useState({
    item_category:'',
    description:'',
    created_at:'2023-01-11 11:11:11',
    is_active:'yes'
   })

  const columnDefs = [
    {headerName: 'Name', field: 'item_category'},
    {headerName: 'Action', field: 'action'}
  ]
  useEffect(()=>{
    getInvestmentCategory()
   },[])
   const getInvestmentCategory = async () =>{
     const resposne = await api.getInvestmetnCategory_setup()
     const {data} = resposne
     console.log(data,"data")
     setCategoryData(data)
   }
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  )

  const handleOpenOperation = () => {
    setOpenSetupOperationDialog(true);
  }

  const handleCloseOperation = () => {
    setOpenSetupOperationDialog(false);
  }
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormValue({
        ...formValue,
        [name]:value
    })
  }
  const handleSubmit = async() =>{
    const response = await api.postInvestmentCategory_setup(formValue)
    const {data} = response
    console.log(data,"res")
    console.log(formValue)
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const SearchValue  = async ()=>{
    const response = await api.getInvestmetnCategory_setup(inputValue)
    const {data}= response 
    setCategoryData(data)
 };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Inventory Category List</h4>
          {/* <select style={{width:'15%'}}>
    <option>select</option>
</select> */}
<input id="myInput" placeholder="search" name="search" value={inputValue} onChange={handleInputChange} />
        <button onClick={()=>SearchValue()}>Search</button>

          <Card>
            <CardBody>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary bg-soft" onClick={handleOpenOperation}><i className="fa fa-plus"></i>&nbsp; Add Category</button>
            </div>
              <div
                className="ag-theme-alpine"
                style={{ height: 500, marginTop: "20px" }}
              >
                <AgGridReact
                  rowData={categoryData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                />
                <SetupInventoryCategoryDialog formValue={formValue} handleChange={handleChange} handleSubmit={handleSubmit} open={openSetupOperationDialog} handleClose={handleCloseOperation}/>
                </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(SetupInventoryCategory)
