import HrDetailDialog from 'pages/Setup/SetupDialog/HrDetailDialog';
import { useState } from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { useHistory } from "react-router-dom"

const Card = ({ staff, staffname, email, qualification, number, role }) => {
  const history = useHistory()
  const [isHovered, setIsHovered] = useState(false);
  const [open,setOpen] = useState(false)
  const handleEdit = async ()=>{
   const response = await history.push('/addstaff',{staff:staff})
  }
  const handleOpen = () =>{
   setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }
  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">
            <img alt="Profile" className="img-fluid" />
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{staffname}</h5>
            <h5 className="card-title">{role}</h5>
            <h5 className="card-title">{qualification}</h5>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Number: {number}</p>
          </div>
        </div>
        {/* Pencil icon - conditionally render when hovered */}
        {isHovered && (
          <>
            <FaPencilAlt
              className="pencil-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => handleEdit()}
            />
            {/* Eyes icon */}
            <FaEye
              className="eye-icon"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={() => handleOpen()}
            />
          </>
        )}


      </div>
      <HrDetailDialog open={open} handleClose={handleClose} staffDetail={staff}/>
    </div>
  );
};

export default Card;
