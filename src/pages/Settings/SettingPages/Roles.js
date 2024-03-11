import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Card, CardBody, Container, Input } from "reactstrap";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import api from "services/Api";
import DeleteButtonRenderer from "common/data/delete-button";
import EditButtonRenderer from "common/data/update-button";
import { ToastContainer, toast } from "react-toastify";
import { getRoles } from "@testing-library/react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";


function RoleSetting() {
  const initialRoleValue = {
    name: "",
    slug: "aad",
    is_active: 1,
    is_system: 1,
    is_superadmin: 1,
    hospital_id: 1,
  };

  const [tableData, setTableData] = useState();
  const [formData, setFormData] = useState(initialRoleValue);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleClickOpen = () => {
    //dialog open
    setSelectedData({});
    setOpen(true);
  };

  const handleClose = () => {
    //dialog close
    setOpen(false);
  };

  const RoleNameLinkRenderer = (props) => {
    const { value, data } = props;

    const handleClick = async () => {
      try {
        const response = await api.getRolebyId(data.id);
        const { data: roleData } = response;
        console.log(data, "role resss");
        setModalData(roleData);
        setModalOpen(true);
      } catch (error) {
        console.error("Error fetching Role details:", error);
      }
    };

    return (
      <Link to="#" onClick={handleClick}>
        {value}
      </Link>
    );
  };

  const columnDefs = [
    { headerName: "Role", field: "name" },
    {
      headerName: "Type",
      field: "is_system",
      cellRendererFramework: (params) => {
        return params.value === 0 || params.value === 1 ? "system" : "";
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: "actionsRenderer",
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
  );

  const onChange = (e) => {
    console.log(e.target.value, "lllll");
    const { value, id } = e.target;
    setSelectedData({ ...formData, [id]: value });
  };

  

  const handleDeleteClick = async (data) => {
    try {
      const toastId = toast.info(
        <div>
          <div className="text-dark">
            Are you sure you want to delete this item?
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-danger btn-md"
              onClick={() => handleDeletionConfirmed(data.id)}
            >
              OK
            </button>
          </div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
        }
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  const handleEditClick = (data) => {
    setSelectedData(data);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeletionConfirmed = async (roleId) => {
    try {
      await api.deleteRole(roleId);
      toast.dismiss();

      toast.success(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Item deleted successfully</div>
          <button
            className="btn btn-danger btn-sm fw-bold"
            onClick={() => toast.dismiss()}
          >
            X
          </button>
        </div>,
        {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          autoClose: 500,
        }
      );

      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const components = {
    actionsRenderer: (props) => (
      <div>
        <EditButtonRenderer onClick={() => props.onEditClick(props.data)} />
        &nbsp;
        <DeleteButtonRenderer onClick={() => props.onDeleteClick(props.data)} />
      </div>
    ),
    RoleNameLinkRenderer: RoleNameLinkRenderer,
  };

  useEffect(() => {
    // getUsers from json
    getSetupRoles();
  }, []);

  const getSetupRoles = () => {
    api.getRoleSetting().then((res) => setTableData(res.data));
    api.http;
  };

  function handleFormSubmit() {
    api.postRoleSetupSetting(formData).then((resp) => {
      console.log(resp, "role res");
    });

    api
      .getRoleSetting({ headers: { "content-type": "application/json" } })
      .then((resp) => {
        getSetupRoles();
        setFormData(initialRoleValue);
      });
  }

  // const onGridReady = useCallback(params => {
  //   api
  //     .get()
  //     .then(resp => resp.data())
  //     .then(data => {
  //       setRowData(data)
  //     })
  // }, [])

  const handleUpdate = async (id) => {
    console.log(id,'id');
    const datas = {id:id,name:selectedData.name,is_system:selectedData.is_system,hospital_id: '1'}
    const response = await api.updateRoles(datas);
    const { data } = response;
    console.log(data, "role data");
  };
  


  return (
    <React.Fragment>
      <ToastContainer />
      <h4>Role</h4>
      <Row>
        <Col lg="4">
          <Container className="p-3">
            <h4>Role</h4>

            <label>Name</label>
            <br />
            <Input
              style={{ width: "100%" }}
              id="name"
              onChange={(e) => onChange(e)}
            ></Input>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn-mod" onClick={handleFormSubmit}>
                Save
              </button>
            </div>
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}  sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "900px", // Set your width here
            },
          },
        }}>
        <DialogTitle style={{backgroundColor: '#7070FF'}} className="fw-bold text-white">Edit Role</DialogTitle>
        <DialogContent>
          <br />
          <Input
            style={{ width: "100%" }}
            id="name"
            onChange={(e) => onChange(e)}
            value={selectedData.name || ""}
          />
        </DialogContent>
        <DialogActions className="d-flex justify-content-center p-3">
          <button onClick={handleEditDialogClose} className="btn btn-danger btn-sm">Cancel</button>
          <button onClick={() => handleUpdate(selectedData)} className="btn btn-success btn-sm">
  Save
</button>

        </DialogActions>
      </Dialog>
          </Container>
        </Col>
        <Col lg="8" className="p-3">
          <Container>
            <h4>Role List</h4>
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
            </div>
          </Container>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default RoleSetting;
