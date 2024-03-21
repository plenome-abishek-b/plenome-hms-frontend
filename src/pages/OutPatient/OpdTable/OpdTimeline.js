import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useEffect } from 'react';
import api from 'services/Api';
import { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import OpdTimelineDialog from '../OpdDialog/OpdTimelineDialog';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';


export default function OpdTimeline() {

  const [timeline,setTimeline] = useState([]);
  const [openTimeline,setOpdTimeLine] = useState();
  const [selectedData,setSelectedData] = useState({})
  const [isHovered, setIsHovered] = useState([]);
  const params = useParams()
  const pid = params?.pid
  useEffect(()=>{
  getTimeline()
  },[])
  const getTimeline = async () =>{
    const response = await api.getOPD_timeline(pid)
    const {data} = response
    console.log(data,"respoTimeline")
    setTimeline(data)
  }
  const openDialog = async () =>{
    setSelectedData({})
    // const response = await api.postOPD_timeline(formData)
    setOpdTimeLine(true)
  }
  const handleCloseTimeline = () =>{
    setOpdTimeLine(false)
  } 
  const handleEdit = async (data) =>{
   console.log(data,"all timeline details.");
   setSelectedData(data)
   setOpdTimeLine(true) 
  }
  const handleDelete = async (id) =>{
    console.log(id,"deleting id")
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this timeline?"
    );
    if (userConfirmed) {
    const response = await api?.deleteOPD_timeline(id)
    getTimeline() 
    }else{
      console.log("no")
    }
  }
  const handleMouseEnter = (index) => {
    setIsHovered((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = true;
      return updatedItems;
    });
  };
   
  const handleMouseLeave = (index) => {
    setIsHovered((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = false;
      return updatedItems;
    });
  };
  const formatDate = (originalDate) => {
    const formattedDate = new Date(originalDate)?.toISOString()?.split('T')[0];
    return formattedDate;
  }

  
  return (
    <Timeline position="alternate" >
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
      <button className='btn-mod bg-soft custom-btn' onClick={openDialog}>
          &nbsp;+ Timeline
        </button>
        </div>
      {timeline && timeline.map((time, index)=>(
      <TimelineItem key='1'> 
        <TimelineSeparator>
          <TimelineDot color='primary'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{formatDate(time.timeline_date)}
        <div className='card mt-3 p-3' style={{border: '4px solid #556ee6'}}   
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
>
          <h3>{time.title}</h3> 
            <p>{time.description}</p>
            {isHovered[index] && (
            <div style={{display:'flex', justifyContent:'end', alignItems:'end'}}>
              <FaPencilAlt
                className="pencil-icon"
                style={{ cursor: 'pointer',color: "#3559E0", fontSize: '14px'}}
                onClick={() => handleEdit(time)}
              /> 
              {/* Eyes icon */}
              <FaTrash 
                className="trash-icon"
                style={{ marginLeft: '10px', cursor: 'pointer',color: "#B31312", fontSize: '16px'  }}
                onClick={() => handleDelete(time?.id)} 
              />
            </div>
          )}
        </div>
        </TimelineContent>
      </TimelineItem> 
          ))}
              <OpdTimelineDialog selectedData={selectedData} getTimeline={getTimeline} open={openTimeline} handleClose={handleCloseTimeline}/>
    </Timeline>
    
  );
}