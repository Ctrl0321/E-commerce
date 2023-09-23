import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../css/Panel.css";
import Logo from "../assets/Gearup logo  6.svg";
import { TbHomeSearch } from "react-icons/tb";
import { BsCalendar3 } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import Home from "./menu/Home";
import Calendar from "./menu/Calender";
import OnlineProfile from "./menu/OnlineProfile";



function Panel() {
  const [activeButton, setActiveButton] = useState("homeButton");
  const [stats, setStats] = useState([]);
  const [searchParams] = useSearchParams();
  const serializedData = searchParams.get("stats");
  var datta = {};
  const parsedData = JSON.parse(serializedData);
  datta=parsedData
  
   const id=datta[0]?.futsalId;
  
  

  useEffect(() => {
    if (serializedData) {
      // Parse the serialized data back into an array
    
      setStats(datta);
    }
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  
  useEffect(() => {
    console.log("stat", stats);
    console.log("idddddddd",datta[0]?.futsalId);
   
  }, []);

  

  return (
    <>
      <div className="portal-container">
        <nav>
          <img className="logo" src={Logo} alt="gear up logo"></img>
          <div className="nav-links">
            <button
              className={`panelbtn ${
                activeButton === "homeButton" ? "activate" : ""
              }`}
              onClick={() => handleButtonClick("homeButton")}
            >
              <TbHomeSearch size={20} /> &nbsp; &nbsp; Home
            </button>
            <button
              className={`panelbtn ${
                activeButton === "calenderButton" ? "activate" : ""
              }`}
              onClick={() => handleButtonClick("calenderButton")}
            >
              <BsCalendar3 size={20} /> &nbsp; &nbsp;Calendar
            </button>
            <button
              className={`panelbtn ${
                activeButton === "profileButton" ? "activate" : ""
              }`}
              onClick={() => handleButtonClick("profileButton")}
            >
              <BiSolidUser size={20} /> &nbsp; &nbsp;Online Profile
            </button>
            <button
              className={`panelbtn ${
                activeButton === "reportButton" ? "activate" : ""
              }`}
              onClick={() => handleButtonClick("reportButton")}
            >
              <TbReport size={20} /> &nbsp; &nbsp;Reports
            </button>
            <button
              className={`panelbtn ${
                activeButton === "settingButton" ? "activate" : ""
              }`}
              onClick={() => handleButtonClick("settingButton")}
            >
              <AiFillSetting size={20} /> &nbsp; &nbsp;Setting
            </button>
          </div>
        </nav>
        <div className="panel-cont" >
        {activeButton==="homeButton"&&(
         <Home id={id}/>
        )}
         {activeButton==="calenderButton"&&(
         <Calendar id={id}/>
        )}
         {activeButton==="profileButton"&&(
         <OnlineProfile id={id}/>
        )}
        </div>
      </div>
    </>
  );
}

export default Panel;
