import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";

interface FormData {
  name: string;
  email: string;
  senha: string;
  biografia: string;
  preferencias: string;
  dataNascimento: string;
  telefone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  estado: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    senha: "",
    biografia: "",
    preferencias: "",
    dataNascimento: "",
    telefone: "",
    cep: "",
    logradouro: "",
    bairro: "",
    estado: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create your submit logic here
  };

  // Fetch CEP data when CEP is filled
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      cep: value,
    }));

    if (value.length === 8) {
      try {
        const response = await fetch(`http://viacep.com.br/ws/${value}/json/`);
        const json = await response.json();
        if (json && json.logradouro) {
          setFormData((prevData) => ({
            ...prevData,
            logradouro: json.logradouro,
          }));
        }
      } catch (error) {
        console.error("Error fetching CEP data:", error);
      }
    }
  };

  return (
    <div className="home">
      <h1>NOME DO SITE</h1>
      <nav>
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <Link to="/login">
            <li>LOGIN</li>
          </Link>
        </ul>
      </nav>
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CEP:
          <input
            type="text"
            name="cep"
            maxLength={8}
            value={formData.cep}
            onChange={handleCepChange}
          />
        </label>
        <br />
        <label>
          Logradouro:
          <input
            type="text"
            name="logradouro"
            value={formData.logradouro}
            readOnly
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
