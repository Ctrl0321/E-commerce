import { React, useState, useEffect } from "react";
import "../css/Login.css";
import axios from "axios";
import {
    Link,
    useNavigate,
    createSearchParams,
    useSearchParams,
  } from "react-router-dom";

function Login() {
  const apiPort = process.env.REACT_APP_PORT_KEY;
  console.log(apiPort);
  const navigate = useNavigate();
  const [admindetails, setAdminDetails] = useState({
    email: "",
    passwordHash: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToApi(admindetails);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendDataToApi = (formData) => {
    axios
      .post(`${apiPort}/admin/signIn`, formData)
      .then((response) => {
        console.log("API response:", response.data.futsal);
        // console.log(response.data.status);
        const serializedData = JSON.stringify(response.data.futsal);

        if(response.data.status==="ok"){
            // navigate("/adminPanel",{state:response.data.status});
            navigate({
                pathname: "/adminPanel",
                search: createSearchParams({
                  stats: serializedData,
                }).toString(),
              });
            
        }
        // Handle success if needed, e.g., redirecting the user
      })
      .catch((error) => {
        console.error("API error:", error);
        // Handle error if needed, e.g., displaying an error message
      });
  };
  return (
    // <form onSubmit={handleSubmit}>
    //   <label>Email: </label>
    //   <input
    //     type="email"
    //     name="email"
    //     value={admindetails.email}
    //     onChange={handleInputChange}
    //   ></input>
    //   <label>Password: </label>
    //   <input
    //     type="password"
    //     name="passwordHash"
    //     value={admindetails.passwordHash}
    //     onChange={handleInputChange}
    //   ></input>
    //   <button type="submit"> Submit</button>
    // </form>
    <div className="container">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome Back</h2>
          <h4 className="animation a2">
            Log in to your account using email and password
          </h4>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={admindetails.email}
            onChange={handleInputChange}
            className="form-field animation a3"
            placeholder="Email Address"
          ></input>
          <input
            type="password"
            name="passwordHash"
            value={admindetails.passwordHash}
            onChange={handleInputChange}
            className="form-field animation a4"
            placeholder="Password"
          ></input>

          <p className="animation a5">
            <a href="#">Forgot Password</a>
          </p>
          <button type="submit" className="animation a6">
            LOGIN
          </button>
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;
