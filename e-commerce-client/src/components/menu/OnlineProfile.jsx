import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/OnlineProfile.css';
import { AiFillDelete } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";




const OnlineProfile=(props)=> {
  const apiPort = process.env.REACT_APP_PORT_KEY;
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    place: '',
    contact: {
      email: '',
      mobile: '',
    },
    rating: '',
    startTime: '',
    endTime: '',
    courtType: '',
    numberOfCourt: '',
    pricePerHour: '',
    courts: [{courtName:''}],
  });
 console.log("form data",formData)
  useEffect(() => {
    axios
      .get(`${apiPort}/futsal/courts/${props.id}`)
      .then((response) => {
        setFormData({ ...response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiPort, props.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "numberOfCourt") {
      const newValue = Math.max(1, parseInt(value, 10));
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else if (name === "email" || name === "mobile") {
      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  
  const handleCourtChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      courts: prevData.courts.map((court, i) =>
        i === index ? { ...court, [name]: value } : court
      ),
    }));
  };


    const addCourt = () => {
      setFormData((prevData) => ({
        ...prevData,
        courts: [...prevData.courts, { courtName: '' }],
      }));
    };
  
    const removeCourt = (index) => {
      setFormData((prevData) => ({
        ...prevData,
        courts: prevData.courts.filter((_, i) => i !== index),
      }));
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${apiPort}/futsal/courts/${props.id}`, formData)
      .then((response) => {
        console.log('Futsal updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
     <div className='input-fields'>

     <div className='form-fields'>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Place:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.contact.email}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile"
          value={formData.contact.mobile}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>

      
      <div className='form-fields'> 
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Court Type:</label>
        <input
          type="text"
          name="courtType"
          value={formData.courtType}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'>
        <label>Number of court:</label>
        <input
          type="number"
          name="numberOfCourt"
          value={formData.numberOfCourt}
          onChange={handleChange}
        />
      </div>
      <div className='form-fields'> 
        <label>Price per hour:</label>
        <input
          type="text"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
        />
      </div>
    
      <div className='form-fields'>
        <label>Courts:</label>
        {formData.courts.map((court, index) => (
          <div key={index} className='form-fields-courts'>
            <input
              type="text"
              name="courtName"
              value={court.courtName}
              onChange={(e) => handleCourtChange(e, index)}
            />
            <button type="button" onClick={() => removeCourt(index)} className='remove-btn'>
              <AiFillDelete size={15}/>
            </button>
          </div>
        ))}
        <button type="button" onClick={addCourt} className="button-add">
          +
        </button>
      </div>
     </div>

      
     
      <button type="submit">Update Futsal</button>
    </form>
  );
}

export default OnlineProfile;