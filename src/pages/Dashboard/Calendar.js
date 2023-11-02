import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "./styles.css"

const EventCalendar = () => {
    // Sample events data (Replace this with your actual event data)
    const events = [
      {
        title: "Event 1",
        start: new Date(2023, 6, 10, 10, 0), // year, month (0-based), day, hour, minute
        end: new Date(2023, 6, 10, 12, 0),
      },
      {
        title: "Event 2",
        start: new Date(2023, 6, 15, 14, 0),
        end: new Date(2023, 6, 15, 16, 0),
      },
      // Add more events as needed
    ];
  
    // Localizer using moment.js
    const localizer = momentLocalizer(moment);
  
    return (
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 530, borderRadius: "7px" }} // Set the height of the calendar as per your requirement
      />
    );
  };

  export default EventCalendar;
  