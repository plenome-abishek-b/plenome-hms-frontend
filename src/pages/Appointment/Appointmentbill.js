import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BillComponent = ({ formData }) => {
  const billRef = useRef();

  const generatePdf = () => {
    html2canvas(billRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 250);
      pdf.save("bill.pdf");
    });
  };

  return (
    <div className="bill" ref={billRef}>
      <h2>Bill Details</h2>
      <p>Patient Name: {formData.patient_name}</p>
      <p>Gender: {formData.gender}</p>
      <p>Doctor Name: {formData.doctor}</p>
      <p>Doctor Fees: {formData.amount}</p>
    </div>
  );
};

export default BillComponent;
