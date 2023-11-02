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


export default function NurseNote() {

  const [nurseNote,setNurseNote] = useState([])

  useEffect(()=>{
  getNurseNote()
  },[])
  const getNurseNote = async () =>{
    const response = await api.getNurseNote()
    const {data} = response
    console.log(data,"respo-nurse note")
    setNurseNote(data)
  }
  return (
    <Timeline position="alternate" >
      {nurseNote && nurseNote.map((note)=>(
      <TimelineItem key='timeline'>
        <TimelineSeparator>
          <TimelineDot color='primary'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{note.date}
        <div className='card mt-3 p-3' style={{border: '4px solid #556ee6'}}>
            <p>{note.note}</p>
        </div>
        </TimelineContent>
      </TimelineItem>
          ))}
    </Timeline>
    
  );
}