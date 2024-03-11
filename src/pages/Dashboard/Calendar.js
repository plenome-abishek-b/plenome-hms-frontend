import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Input } from "reactstrap";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSelect = ({ start }) => {
    setSelectedDate(start);
    setShowPopup(true);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: newEventTitle,
      start: selectedDate,
      end: moment(selectedDate).add(2, "hours").toDate(), // End time is 2 hours after start time
      color: getRandomColor(),
    };
    setEvents([...events, newEvent]);
    setShowPopup(false);
    setSelectedDate(null);
    setNewEventTitle("");
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const getRandomColor = () => {
    const colors = [
      "#FCDC2A",
      "#EE4266",
      "#50C4ED",
      "#9F70FD",
      "#FE7A36",
      "#7ED7C1",
    ]; // Bootstrap colors
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, border: "10px solid #8080FF", borderRadius: "8px" }}
        onSelectSlot={handleSelect}
        selectable
        onSelectEvent={(event) => handleDelete(event.id)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            borderRadius: "0px",
            color: "#fff",
            border: "none",
            padding: "5px",
            fontWeight: "500",
          },
        })}
      />
      {showPopup && (
        <div className="popup" style={{ backgroundColor: "#F0F0F0", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", borderRadius: "10px", zIndex: 999 }}>
          <div className="d-flex justify-content-center">
            <h4 className="text-dark">Add Event</h4>
          </div>
          
          <div className="d-flex justify-content-center">
            <Input
              type="text"
              placeholder="Event Name"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              style={{ width: '80%', border: '1px solid rgba(0,0,0,0.2)' }}
            />
          </div>

          <br />
          <div className="d-flex justify-content-center">
            <button
              onClick={handleAddEvent}
              className="btn btn-success fw-bold btn-sm"
            >
              Add Event
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="btn btn-danger fw-bold btn-sm ms-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
