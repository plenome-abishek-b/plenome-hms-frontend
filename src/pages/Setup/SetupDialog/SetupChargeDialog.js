import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row, Col, Container, Label, Input, CardBody, Card } from "reactstrap";
import { TextField } from "@material-ui/core";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import PatientDialog from "pages/Appointment/Dialog/PatientDialog";
import api from "services/Api";

export default function SetupChargeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
  updateTaxCategorys,
}) {
  const [openChargeDialog, setOpenChargeDialog] = React.useState(false);
  const [chargetypes, setChargetypes] = useState([]);
  const [chargecategory, setChargecategory] = useState();
  const [chargename, setChargename] = useState();
  const [selectedTaxCategoryId, setSelectedTaxCategoryId] = useState("");
  const [taxcategory, setTaxCategory] = useState([]);
  const [updateTaxCategory, setUpdateTaxCategory] = useState({});

  const [unit, setUnit] = useState();
  const [percentage, setPercentage] = useState();

  console.log(selectedTaxCategoryId, " select tax");

  console.log(percentage, "percent");

  const handleClickOpen = () => {
    //dialog open
    setOpenChargeDialog(true);
  };

  const handleDialogClose = () => {
    //dialog close
    setOpenChargeDialog(false);
  };

  useEffect(() => {
    getChargeType();
    handleChargeTypeChange();
    getChargename();
    getTaxCategoryId();
    getUnitType();
    getTaxPercentage();
  }, []);

  const getChargeType = async () => {
    const response = await api.getChargetype();
    const { data } = response;
    console.log(data, "ppppppp");
    setChargetypes(data);
  };

  const handleChargeTypeChange = async (e) => {
    onChange(e);

    const selectedChargeTypeId = e.target.value;
    if (selectedChargeTypeId !== "select") {
      try {
        const setupChargeCategoryResponse = await api.getSetupChargeCategory(
          selectedChargeTypeId
        );
        const { data } = setupChargeCategoryResponse;
        console.log(data, "ppppppp");

        setChargecategory(data);
      } catch (error) {
        console.error("Error fetching setup charge category:", error);
      }
    }
  };

  const getChargename = async () => {
    const response = await api.getSetupChargeName();
    const { data } = response;
    console.log(data, "ppppppp");
    // setChargename(data)
  };

  const getTaxCategoryId = async () => {
    try {
      const response = await api.getTaxCategory();
      const { data } = response;
      setTaxCategory(data || []);
    } catch (error) {
      console.error("Error fetching tax categories:", error);
    }
  };

  const getUnitType = async () => {
    const response = await api.getUnitType();
    const { data } = response;
    console.log(data, "unit data");
    setUnit(data);
  };

  const getTaxPercentage = async () => {
    const response = await api.getTaxCategory();
    const { data } = response;
    console.log(data, "percentage");
    setPercentage(data);
  };

  const handleTaxCategoryChange = (e) => {
    const selectedTaxCategoryId = e.target.value;
    console.log(e.target.id);
    const selectedTaxCategory = taxcategory.find(
      (category) => category.id === parseInt(selectedTaxCategoryId)
    );

    setSelectedTaxCategoryId(selectedTaxCategoryId);
    setPercentage(selectedTaxCategory?.percentage || "");

    const taxCategoryId = selectedTaxCategory;
    console.log(taxCategoryId, "tax ctgry");

    const updateTaxCategorys = {
      ...data,
      [e.target.id]: selectedTaxCategoryId,
    };
    console.log(updateTaxCategorys, "updated");
    setUpdateTaxCategory(updateTaxCategorys);
  };

  const handleFormSubmits = () => {
    updateTaxCategorys(updateTaxCategory);
    handleFormSubmit(data, handleClose, updateTaxCategory);
  };

  console.log(taxcategory, "tax");
  const styles = {
    label_text: {
      color: "#1C2253",
      fontSize: "14px", 
      fontWeight: "500",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className="bg-primary text-white">
          Add Charges
        </DialogTitle>
        <DialogContent className="mt-4 ms-2">
          <Container className="" style={styles.label_text}>
            <Row className="p-1">
              <Col lg="3" md="3" sm="12">
                <label>Charge Type<span className="text-danger ms-1">*</span></label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="charge_type"
                  value={data.charge_type}
                  onChange={handleChargeTypeChange} // Use the modified handler
                >
                  <option value="select">select</option>
                  {chargetypes &&
                    chargetypes.map((charge_type) => (
                      <option key={charge_type.id} value={charge_type.id}>
                        {charge_type.charge_type}
                      </option>
                    ))}
                </select>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Charge Category<span className="text-danger ms-1">*</span></label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="charge_category_id"
                  value={data.charge_category_id}
                  onChange={(e) => onChange(e)}
                >
                  <option>select</option>
                  {chargecategory &&
                    chargecategory.map((charge_category) => (
                      <option
                        key={charge_category.id}
                        value={charge_category.id}
                      >
                        {charge_category.name}
                      </option>
                    ))}
                </select>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Charge Name<span className="text-danger ms-1">*</span></label>
                <br />
                <input
                  id="name"
                  value={data.name}
                  onChange={(e) => onChange(e)}
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                ></input>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Unit Type<span className="text-danger ms-1">*</span></label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                >
                  <option>select</option>
                  {unit &&
                    unit.map((unit_type) => (
                      <option key={unit_type.id} value={unit_type.id}>
                        {unit_type.unit}
                      </option>
                    ))}
                </select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="3" md="3" sm="12">
                <label>Tax Category<span className="text-danger ms-1">*</span></label>
                <br />
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="tax_category_id"
                  value={selectedTaxCategoryId}
                  onChange={handleTaxCategoryChange}
                >
                  <option value="">select</option>
                  {taxcategory &&
                    taxcategory.map((tax_category) => (
                      <option key={tax_category.id} value={tax_category.id}>
                        {tax_category.name}
                      </option>
                    ))}
                </select>
              </Col>
              <Col lg="3" md="3" sm="12">
                <label>Tax (%)</label>
                <br />
                <input
                  id="tax_category_id"
                  type="number"
                  placeholder="%"
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  value={percentage}
                  readOnly
                ></input>
              </Col>
              <Col lg="6" md="6" sm="6">
                <label>Scheduled Charges For TPA</label>
                <br />
                <Card>
                  <CardBody>
                    <table>
                      <tr>
                        <input type="hidden"></input>
                        <td>NHIF</td>
                      </tr>
                      <br />
                      <tr>
                        <input type="hidden"></input>
                        <td>Health Life Insurance</td>
                      </tr>
                      <br />
                      <tr>
                        <input type="hidden"></input>
                        <td>Star Health Insurance</td>
                      </tr>
                      <br />
                      <tr>
                        <input type="hidden"></input>
                        <td>IDBI Federal</td>
                      </tr>
                      <br />
                      <tr>
                        <input type="hidden"></input>
                        <td>CGHS</td>
                      </tr>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
            <Row style={{ position: "relative", bottom: "210px" }}>
              <Col lg="6" md="6" sm="6">
                <label>Standard Charge(₹)<span className="text-danger ms-1">*</span></label>
                <br />
                <input
                  type="number"
                  style={{
                    width: "100%",
                    height: "40px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="standard_charge"
                  value={data.standard_charge}
                  onChange={(e) => onChange(e)}
                ></input>
              </Col>
            </Row>
            <br />
            <Row style={{ position: "relative", bottom: "210px" }}>
              <Col lg="6" md="6" sm="6">
                <label>Description</label>
                <br />
                <textarea
                  style={{
                    width: "100%",
                    height: "50px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="description"
                  value={data.description}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </Col>
            </Row>
            <Row style={{ position: "relative", bottom: "210px" }}>
              <Col lg="6" md="6" sm="6">
                <label>Date</label>
                <br />
                <input
                  style={{
                    width: "100%",
                    height: "50px",
                    border: '1px solid #8F98B3', 
                    borderRadius: '8px'
                  }}
                  id="date"
                  value={data.date}
                  onChange={(e) => onChange(e)}
                  type="date"
                ></input>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions>
          <button
            className="btn-mod bg-primary btn-md"
            onClick={() => handleFormSubmits(data, handleClose)}
            style={{ marginRight: "3%" }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
