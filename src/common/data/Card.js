import { useState } from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import QRCode from 'qrcode.react'; // Import QRCode library
import HrDetailDialog from 'pages/Setup/SetupDialog/HrDetailDialog';
import './Card.css'; // Import CSS file for custom styling

const Card = ({ getAllStaff, staff, staffname, email, qualification, number, role, location }) => {
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEdit = async () => {
    const response = await history.push('/addstaff', { staff: staff });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const staffDetails = `${staffname}, ${role}, ${qualification}, ${email}, ${number}`;

  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 col-sm-6" >
            {/* QR Code */}
            <QRCode value={staffDetails} bgColor="#ffffff" fgColor="#000000" style={{border: '9px solid #419197',borderRadius: '5px', padding: '9px'}}/>
          </div>
          <div className="col-md-8 col-sm-6">
            <h5 className="card-title">{staffname}</h5>
            <h5 className="card-title">{role}</h5>
            <h5 className="card-title">{qualification}</h5>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Number: {number}</p>
          </div>
        </div>
        <div className='mt-2 d-flex justify-content-end edit-div'>
          {isHovered && (
            <>
              <FaPencilAlt
                className="pencil-icon"
                style={{ cursor: 'pointer',color: "#3559E0", fontSize: '14px'}}
                onClick={() => handleEdit()}
              />
              {/* Eyes icon */}
              <FaEye
                className="eye-icon"
                style={{ marginLeft: '10px', cursor: 'pointer',color: "#B31312", fontSize: '16px'  }}
                onClick={() => handleOpen()}
              />
            </>
          )}
        </div>

      </div>
      <HrDetailDialog location={location} getAllStaff={getAllStaff} open={open} handleClose={handleClose} staffDetail={staff} />
    </div>
  );
};

export default Card;
