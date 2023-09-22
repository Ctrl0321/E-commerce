import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Booking.css";

const Bookings = (promps) => {
  const apiPort = process.env.REACT_APP_PORT_KEY;
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [showAllBookings, setShowAllBookings] = useState(false);


  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      const apiUrl =`${apiPort}/booking/getBooking/${promps.id}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const bookingData = response.data.allBookings;
          // console.log(bookingData);
          setBookings(bookingData);
          // restaurantBranches = bookingData;
          localStorage.setItem("bookings", JSON.stringify(bookingData));
        })
        .catch((error) => {
          console.error("Error fetching restaurant:", error);
        });
    }

}, []);

useEffect(() => {
  const handleBeforeUnload = () => {
    localStorage.removeItem("bookings");
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);


  // useEffect(() => {
   
  //   axios
  //     .get(`http://localhost:1337/booking/getBooking/${promps.id}`) 
  //     .then((response) => {
       
  //       console.log("data",response.data);
  //       setBookings(response.data.allBookings);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []); 

  // useEffect(() => {
  //   console.log(bookings);
  //   console.log("Upcoming", upcomingBookings);
  // }, [bookings, upcomingBookings]);

  useEffect(() => {
    const currentDate = new Date();
    // Filter upcoming bookings
    const upcomingBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      return bookingDate >= currentDate;
    });

    setUpcomingBookings(upcomingBookings);
  }, []);


  const handleViewAllClick = () => {
    setShowAllBookings(!showAllBookings); // Set to true when the "View All" button is clicked
  };


  

  return (
    <div className="booking-container">
      <div className="table-head">
        <h2>Upcoming bookings</h2>
        <button  onClick={handleViewAllClick}>  {showAllBookings ? "View All" : "View Less"}</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Time</th>
            <th>Name</th>
            <th>Court Name</th>
          </tr>
        </thead>
        <tbody>
        {showAllBookings? bookings.slice(0,2).map((upBooking) => (
            <tr key={upBooking.bookingId}>
              <td>{upBooking.bookingId}</td>
              <td>
                {upBooking.startTime}-{upBooking.endTime}
              </td>
              <td>{upBooking.userName}</td>
              <td className="court">{upBooking.courtName}</td>
            </tr>
          )): bookings.map((upBooking) => (
            <tr key={upBooking.bookingId}>
              <td>{upBooking.bookingId}</td>
              <td>
                {upBooking.startTime}-{upBooking.endTime}
              </td>
              <td>{upBooking.userName}</td>
              <td className="court">{upBooking.courtName}</td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
