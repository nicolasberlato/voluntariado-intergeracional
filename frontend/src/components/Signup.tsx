import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Signup.css";
import Img4 from "../assets/img4.jpg";

interface Address {
  cep: string;
  localidade: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: string;
}

interface Activity {
  id: number;
  name: string;
}


interface FormData {
  usertype: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  address: Address;
  activities: number[];
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    usertype: "",
    name: "",
    email: "",
    password: "",
    activities: [],
    birthDate: "",
    address: {
    cep: "",
    localidade: "",
    logradouro: "",
    bairro: "",
    estado: "",
    numero: "",
    complemento: "",
    },
  });

   const [availableActivities ] = useState<Activity[]>([
     { id: 1, name: "Leitura" },
     { id: 2, name: "Ajuda com tecnologia" },
     { id: 3, name: "Atividade física" },
   ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "activities") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions
      ).map((option) => Number(option.value));
      setFormData((prevData) => ({
        ...prevData,
        activities: selectedOptions,
      }));
    } else if (
      [
        "numero",
        "complemento",
        "cep",
        "localidade",
        "logradouro",
        "bairro",
        "estado",
      ].includes(name)
    ) {
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

  try {
    const response = await fetch("URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Signup successful:", data);
   
    } else {
      const error = await response.json();
      console.error("Signup failed:", error);
  
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    
  }
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
              localidade: json.localidade,
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

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    activityId: number
  ) => {
    if (e.target.checked) {

      setFormData((prevData) => ({
        ...prevData,
        activities: [...prevData.activities, activityId],
      }));
    } else {

      setFormData((prevData) => ({
        ...prevData,
        activities: prevData.activities.filter((id) => id !== activityId),
      }));
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
      <div className="form">
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
          <br />
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
            Data de nascimento:
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>Atividades:</label>
          <div>
            {availableActivities.map((activity) => (
              <div key={activity.id}>
                <label>
                  <input
                    type="checkbox"
                    name="activities"
                    value={activity.id}
                    checked={formData.activities.includes(activity.id)}
                    onChange={(e) => handleCheckboxChange(e, activity.id)}
                  />
                  {activity.name}
                </label>
              </div>
            ))}
          </div>
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
              name="localidade"
              value={formData.address.localidade}
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
          <button type="submit">Enviar</button>
        </form>
        
      </div>
    </div>
  );
}

export default Signup;
