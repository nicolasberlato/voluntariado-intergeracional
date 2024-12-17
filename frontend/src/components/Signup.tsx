import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './styles/Signup.css';
import axios, { AxiosResponse } from "axios";

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
  userType: string;
  name: string;
  email: string;
  password: string;
  address: Address;
  activities: number[];
}



function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    name: "",
    email: "",
    password: "",
    activities: [],
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

   const [availableActivities] = useState<Activity[]>([
     { id: 1, name: "Tarefas domésticas" },
     { id: 2, name: "Ajuda com tecnologia" },
     { id: 3, name: "Leitura" },
     { id: 4, name: "Atividades ao ar livre" },
     { id: 5, name: "Companhia" },
     { id: 6, name: "Conversar" },
     { id: 7, name: "Atividades físicas" },
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
     
     const response: AxiosResponse = await axios.post(
       "http://localhost:8080/auth/register",
       formData,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     console.log("Signup successful:", response.data);
     navigate("/login");
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
    <div className="signup">
      <h1>AFETO CONECTA</h1>
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
      <div>
        <form className="form-signup" onSubmit={handleSubmit}>
          <p className="voluntarioUsuario">Você é um voluntário ou usuário?</p>
          <div id="tipo">
            <label>
              <input
                id="radio"
                type="radio"
                name="userType"
                value="VOLUNTARIO"
                checked={formData.userType === "VOLUNTARIO"}
                onChange={handleChange}
              />
              Voluntário
            </label>
            <label>
              <input
                id="radio"
                type="radio"
                name="userType"
                value="USUARIO"
                checked={formData.userType === "USUARIO"}
                onChange={handleChange}
              />
              Usuário
            </label>
          </div>
          <input
            placeholder="Nome:"
            id="signupinput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="E-mail:"
            id="signupinput"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Senha:"
            id="signupinput"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="CEP:"
            id="signupinput"
            type="text"
            name="cep"
            maxLength={8}
            value={formData.address.cep}
            onChange={handleCepChange}
            required
          />
          <input
            placeholder="Cidade:"
            id="signupinput"
            type="text"
            name="localidade"
            value={formData.address.localidade}
            readOnly
          />
          <input
            placeholder="Logradouro:"
            id="signupinput"
            type="text"
            name="logradouro"
            value={formData.address.logradouro}
            readOnly
          />
          <input
            placeholder="Bairro:"
            id="signupinput"
            type="text"
            name="bairro"
            value={formData.address.bairro}
            readOnly
          />
          <input
            placeholder="Estado:"
            id="signupinput"
            type="text"
            name="estado"
            value={formData.address.estado}
            readOnly
          />
          <input
            placeholder="Numero:"
            id="signupinput"
            type="text"
            name="numero"
            value={formData.address.numero}
            onChange={handleChange}
          />
          <input
            placeholder="Complemento"
            id="signupinput"
            type="text"
            name="complemento"
            value={formData.address.complemento}
            onChange={handleChange}
          />
          <br />
          <label id="atividadeslabel">Atividades:</label>
          {availableActivities.map((activity) => (
            <div key={activity.id}>
              <label id="atividades">
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
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
