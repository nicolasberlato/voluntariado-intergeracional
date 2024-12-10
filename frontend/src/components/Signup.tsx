import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";

interface FormData {
  tipo: string;
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
  numero: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    tipo: "",
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
    numero: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  
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
        if (json && json.logradouro && json.bairro && json.estado) {
          setFormData((prevData) => ({
            ...prevData,
            logradouro: json.logradouro,
            bairro: json.bairro,
            estado: json.estado,
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
        <p>Você é um voluntário ou usuário?</p>

        <label>
          <input
            type="radio"
            name="tipo"
            value="voluntario"
            checked={formData.tipo === "voluntario"} // Mark as selected if it matches formData.tipo
            onChange={handleChange} // Update the state on selection
          />
          Voluntário
        </label>

        <label>
          <input
            type="radio"
            name="tipo"
            value="usuario"
            checked={formData.tipo === "usuario"} 
            onChange={handleChange} 
          />
          Usuário
        </label>

        <br />
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          E-mail:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="text"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Biografia:
          <textarea
            name="biografia"
            rows={6}
            value={formData.biografia}
            onChange={handleChange}
            placeholder="Escreva sua biografia aqui..."
          />
        </label>
        <label>
          Preferencias:
          <input
            type="text"
            name="preferencias"
            value={formData.preferencias}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Data de nascimento:
          <input
            type="text"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Data de nascimento:
          <input
            type="text"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
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
        <label>
          Bairro:
          <input type="text" name="bairro" value={formData.bairro} readOnly />
        </label>
        <br />
        <label>
          Estado:
          <input type="text" name="estado" value={formData.estado} readOnly />
        </label>
        <br />
        <label>
          Numero:
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
