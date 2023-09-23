import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/OnlineProfile.css'

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
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Place:</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.contact.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile"
          value={formData.contact.mobile}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Court Type:</label>
        <input
          type="text"
          name="courtType"
          value={formData.courtType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Number of court:</label>
        <input
          type="number"
          name="numberOfCourt"
          value={formData.numberOfCourt}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>price per hour:</label>
        <input
          type="text"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Courts:</label>
        {formData.courts.map((court, index) => (
          <div key={index}>
            <input
              type="text"
              name="courtName"
              value={court.courtName}
              onChange={(e) => handleCourtChange(e, index)}
            />
            <button type="button" onClick={() => removeCourt(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addCourt}>
          Add Court
        </button>
      </div>

      
     
      <button type="submit">Update Futsal</button>
    </form>
  );
}

export default OnlineProfile;
