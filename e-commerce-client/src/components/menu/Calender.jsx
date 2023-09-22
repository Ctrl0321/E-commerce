// Calendar.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../css/Calender.css";
import axios from "axios";


const Calendar = (promps) => {
    const apiPort = process.env.REACT_APP_PORT_KEY;
  const [events, setEvents] = useState([]);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [showPopup, setShowPopup] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);
const [customerDetails, setCustomerDetails] = useState(null);


  useEffect(() => {
    const storedBookings = localStorage.getItem("events");

    if (storedBookings) {
      setEvents(JSON.parse(storedBookings));
    } else {
      const apiUrl = `${apiPort}/booking/getBooking/${promps.id}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const bookingData = response.data.allBookings;
          // console.log(bookingData);
          const transformedEvents = bookingData.map((booking) => ({
            id:booking._id,
            title: `court ${booking.courtName}`,
            start: booking.bookingTime,
            end: booking.bookingTime,
            backgroundColor: booking.status === "complete" ? "green" : "orange",
            // You can include other event properties if needed
          }));
          console.log("transss data", transformedEvents);
          setEvents(transformedEvents);
          localStorage.setItem("events", JSON.stringify(transformedEvents));
        })
        .catch((error) => {
          console.error("Error fetching restaurant:", error);
        });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("events");
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const fetchCustomerDetails = (eventId) => {
    // Make an API call to retrieve customer details using the event ID
    // Replace this with your actual API call
    axios.get(`${apiPort}/users/getUser/${eventId}`)
      .then((response) => {
        setCustomerDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };
  

  return (
    <div className="calender-container">
      {/* <div className="calendar-controls">
        <button
          onClick={() => {
            setCalendarView("dayGridMonth");
            console.log("Month View button clicked");
          }}
        >
          Month View
        </button>
        <button
          onClick={() => {
            setCalendarView("timeGridWeek");
            console.log(calendarView);
            console.log("Time View button clicked");
          }}
        >
          Week View
        </button>
        <button onClick={() => setCalendarView("timeGridDay")}>Day View</button>
      </div> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarView}
        events={events}
        eventTimeFormat={{
            hour: '2-digit', // Two-digit hour (e.g., 04)
            minute: '2-digit', // Two-digit minute (e.g., 03)
            meridiem: 'short' // AM/PM
          }}
        eventClick={(info) => {
          // Handle event click (edit/delete)
          // You can open a modal or navigate to an event editing page
          console.log("Event clicked:", info.event);
          setSelectedEvent(info.event);
          setShowPopup(true);
          const eventId = info.event.id;
          fetchCustomerDetails(eventId); // Implement this function
        }}
      />
     {showPopup && customerDetails && (
  <div className="popup">
    <div className="popup-content">
      <h3>Customer Details</h3>
      <p>Name: {customerDetails.name}</p>
      <p>Email: {customerDetails.email}</p>
      {/* Add more customer details here */}
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Calendar;
