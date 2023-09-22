import { useState, useEffect } from "react";
import axios from "axios";
import Bookings from "./Bookings";
import "../../css/Home.css";

const Home = (promps) => {
  const apiPort = process.env.REACT_APP_PORT_KEY;
  const [data, setData] = useState([]);
  const [last3MonthsCount, setLast3MonthsCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [totalAmountLast3Months, setTotalAmountLast3Months] = useState(0);

  useEffect(() => {
    // Step 5: Make an Axios request to fetch data
    axios
      .get(`${apiPort}/booking/getBooking/${promps.id}`) // Replace with your API endpoint
      .then((response) => {
        // Step 6: Update the state variable with the fetched data
        setData(response.data.allBookings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    console.log(data);
  }, []);
  

  const date = new Date(); // Replace this with your date

  const monthInLetters = date.toLocaleDateString("en-US", { month: "long" });
  const currentDate = new Date();
  const threeMonthsAgo = new Date();

  useEffect(() => {
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    // Filter bookings for the last 3 months
    const last3MonthsBookings = data.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      return bookingDate >= threeMonthsAgo && bookingDate <= currentDate;
    });

    // Calculate the total amount for the last 3 months
    const totalAmount = last3MonthsBookings.reduce((acc, booking) => {
      return acc + booking.price;
    }, 0);

    // Filter bookings for today
    const todayBookings = data.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      const isSameDay =
        bookingDate.getDate() === currentDate.getDate() &&
        bookingDate.getMonth() === currentDate.getMonth() &&
        bookingDate.getFullYear() === currentDate.getFullYear();
      return isSameDay;
    });

    setLast3MonthsCount(last3MonthsBookings.length);
    setTodayCount(todayBookings.length);
    setTotalAmountLast3Months(totalAmount);
  }, [data]);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="text-header">
          <h1>Sales Overview</h1>
          <p>view your current sales and summery</p>
        </div>
        <div className="filter-header"></div>
      </div>
      <div className="home-body">
        <div className="details-card">
          <div className="detail-card">
            <h4>Revenue</h4>
            <h2>Rs.{totalAmountLast3Months}</h2>
            <p>
              vs. 3 months prior to {currentDate.getDate()} {monthInLetters}
            </p>
          </div>
          <div className="detail-card">
            <h4>Bookings today</h4>
            <h2>{todayCount}</h2>
            {/* <p>vs. 3 months prior to 20 jan</p> */}
          </div>
          <div className="detail-card">
            <h4>Orders</h4>
            <h2>{last3MonthsCount}</h2>
            <p>
              vs. 3 months prior to {currentDate.getDate()} {monthInLetters}
            </p>
          </div>
        </div>
        <div className="home-body-bottom">
        <div className="booking-list">
            <Bookings id={promps.id}/>
        </div>
        <div className="calender"></div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
