import React, { useState, useMemo, useEffect } from "react"
import { Row, Col, Card, CardBody, Container } from "reactstrap"
import { AgGridReact, AgGridColumn } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import api from "services/Api"

function RoleSetting() {
  const initialRoleValue = {
    name: '',
    created_at: '2023-11-11 10:11:12'
  }

  const [tableData,setTableData] = useState()
  const [formData,setFormData] = useState(initialRoleValue)

  const columnDefs = [
    { headerName: "Role", field: "name" },
    {
      headerName: "Type",
      field: "is_system",
      cellRendererFramework: (params) => {
        return params.value === 0 || params.value === 1 ? "system" : "";
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

  const onChange = (e) => {
    console.log(e.target.value,"lllll")
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
   
  useEffect(() => {
    // getUsers from json
    getSetupRoles()
  }, [])

  const getSetupRoles = () => {
    api.getRoleSetting().then(res => setTableData(res.data))
    api.http
  }

  function handleFormSubmit() {
    api.postRoleSetupSetting(formData).then(resp => {
      console.log(resp, 'role res')
    })
   

    api
      .getRoleSetting({ headers: { "content-type": "application/json" } })
      .then(resp => {
        getSetupRoles()
        setFormData(initialRoleValue)
        preventDefault()
      })
      handleClose()
  }

  // const onGridReady = useCallback(params => {
  //   api
  //     .get()
  //     .then(resp => resp.data())
  //     .then(data => {
  //       setRowData(data)
  //     })
  // }, [])

  return (
    <React.Fragment>
      <h4>Role</h4>
      <Row>
        <Col lg="4">
          <Card>
            <CardBody>
            <h4>Role</h4>
              <label>Name</label>
              <br />
              <input style={{width: '100%'}} id="name" onChange={e=>onChange(e)}></input>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn-mod" onClick={handleFormSubmit}>Save</button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="8">
        <Card>
            <CardBody>
            <h4>Role List</h4>
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
            </CardBody>
        </Card>
         
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default RoleSetting
