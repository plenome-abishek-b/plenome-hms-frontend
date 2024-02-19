import React from 'react';
import { Modal } from 'reactstrap'; // Import Modal from react-bootstrap
import QRCode from 'qrcode.react'; // Import QRCode library

const QRCodecomp = ({ isOpen, handleClose, staffDetails }) => {
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCode value={staffDetails} bgColor="#ffffff" fgColor="#000000" style={{ border: '9px solid #419197', borderRadius: '5px', padding: '9px' }} />
      </Modal.Body>
    </Modal>
  );
};

export default QRCodecomp;
