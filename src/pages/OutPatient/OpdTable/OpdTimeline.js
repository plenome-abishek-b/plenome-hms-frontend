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


export default function OpdTimeline() {

  const [timeline,setTimeline] = useState([])

  useEffect(()=>{
  getTimeline()
  },[])
  const getTimeline = async () =>{
    const response = await api.getOpdTimeline()
    const {data} = response
    console.log(data,"respo")
    setTimeline(data)
  }

  
  return (
    <Timeline position="alternate" >
      {timeline && timeline.map((time)=>(
      <TimelineItem key='1'> 
        <TimelineSeparator>
          <TimelineDot color='primary'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{time.date}
        <div className='card mt-3 p-3' style={{border: '4px solid #556ee6'}}>
            <p>{time.description}</p>
        </div>
        </TimelineContent>
      </TimelineItem>
          ))}
    </Timeline>
    
  );
}