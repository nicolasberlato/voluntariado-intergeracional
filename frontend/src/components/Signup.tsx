import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";

interface Address {
  cep: string;
  cidade: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: string;
}

interface FormData {
  usertype: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  address: Address;

  preferencias: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    usertype: "",
    name: "",
    email: "",
    password: "",
    preferencias: "",
    birthDate: "",
    address: {
    cep: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    estado: "",
    numero: "",
    complemento: "",
    },
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;


    if (["numero", "complemento"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
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



  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  };

  
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

  
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        cep: value,
      },
    }));

    if (value.length === 8) {
      try {
        const response = await fetch(`http://viacep.com.br/ws/${value}/json/`);
        const json = await response.json();
        if (
          json &&
          json.logradouro &&
          json.bairro &&
          json.localidade &&
          json.uf
        ) {
          setFormData((prevData) => ({
            ...prevData,
            address: {
              ...prevData.address,
              cidade: json.localidade,
              logradouro: json.logradouro,
              bairro: json.bairro,
              estado: json.uf,
            },
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
            name="usertype"
            value="voluntario"
            checked={formData.usertype === "voluntario"}
            onChange={handleChange}
          />
          Voluntário
        </label>

        <label>
          <input
            type="radio"
            name="usertype"
            value="usuario"
            checked={formData.usertype === "usuario"}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
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
            name="birthDate"
            value={formData.birthDate}
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
            value={formData.address.cep}
            onChange={handleCepChange}
          />
        </label>
        <br />
        <label>
          Cidade:
          <input
            type="text"
            name="cidade"
            value={formData.address.cidade}
            readOnly
          />
        </label>
        <label>
          Logradouro:
          <input
            type="text"
            name="logradouro"
            value={formData.address.logradouro}
            readOnly
          />
        </label>
        <br />
        <label>
          Bairro:
          <input
            type="text"
            name="bairro"
            value={formData.address.bairro}
            readOnly
          />
        </label>
        <br />
        <label>
          Estado:
          <input
            type="text"
            name="estado"
            value={formData.address.estado}
            readOnly
          />
        </label>
        <br />
        <label>
          Numero:
          <input
            type="text"
            name="numero"
            value={formData.address.numero}
            onChange={handleChange}
          />
        </label>
        <label>
          Complemento
          <input
            type="text"
            name="complemento"
            value={formData.address.complemento}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
