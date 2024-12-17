import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import './styles/Login.css';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPasword ] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const { token, userId, user } = data;

      if (response.ok) {
        localStorage.setItem("userType", user.userType.toLowerCase());
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userAddress", user.address.localidade);
        navigate("/landingpage");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login">
      <h1>AFETO CONECTA</h1>
      <nav>
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <Link to="/signup">
            <li>CADASTRE-SE</li>
          </Link>
        </ul>
      </nav>
      <hr />
      <h2>LOGIN: </h2>
      <form id="loginform" onSubmit={handleSubmit}>
        <input id='logininput' type="email" placeholder="EMAIL: " name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input id='logininput' type="password" placeholder="SENHA: " name="password" required value={password} onChange={(e) => setPasword(e.target.value)}/>
        <button id="loginbutton" type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default Login;
