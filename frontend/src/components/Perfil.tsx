import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Perfil.css";

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

interface ProfileData {
  name: string;
  email: string;
  address: Address;
  activities: number[];
}

function ProfileEdit() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    address: {
      cep: "",
      localidade: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      estado: "",
    },
    activities: [],
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
      setProfileData((prevData) => ({
        ...prevData,
        activities: selectedOptions,
      }));
    } else if (
      [
        "cep",
        "localidade",
        "logradouro",
        "bairro",
        "estado",
        "numero",
        "complemento",
      ].includes(name)
    ) {
      setProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    activityId: number
  ) => {
    if (e.target.checked) {
      setProfileData((prevData) => ({
        ...prevData,
        activities: [...prevData.activities, activityId],
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        activities: prevData.activities.filter((id) => id !== activityId),
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      const response = await axios.put(
        "http://localhost:8080/users/me",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data); 
      navigate("/landingpage");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

   const handleLogout = () => {
     localStorage.clear();
     navigate("/");
   };

  return (
    <div className="profile-edit">
      <h1>AFETO CONECTA</h1>
      <nav>
        <ul>
          <Link to="/landingpage">
            <li>HOME</li>
          </Link>
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
      <hr />
      <h2>Editar Perfil</h2>
      <form className="form-profile" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <input
          type="text"
          name="cep"
          value={profileData.address.cep}
          onChange={handleChange}
          placeholder="CEP"
          maxLength={8}
        />
        <input
          type="text"
          name="localidade"
          value={profileData.address.localidade}
          onChange={handleChange}
          placeholder="Cidade"
          readOnly
        />
        <input
          type="text"
          name="logradouro"
          value={profileData.address.logradouro}
          onChange={handleChange}
          placeholder="Logradouro"
          readOnly
        />
        <input
          type="text"
          name="bairro"
          value={profileData.address.bairro}
          onChange={handleChange}
          placeholder="Bairro"
          readOnly
        />
        <input
          type="text"
          name="estado"
          value={profileData.address.estado}
          onChange={handleChange}
          placeholder="Estado"
          readOnly
        />
        <input
          type="text"
          name="numero"
          value={profileData.address.numero}
          onChange={handleChange}
          placeholder="Número"
        />
        <input
          type="text"
          name="complemento"
          value={profileData.address.complemento}
          onChange={handleChange}
          placeholder="Complemento"
        />

        {availableActivities.map((activity) => (
          <div key={activity.id}>
            <label>
              <input
                type="checkbox"
                value={activity.id}
                checked={profileData.activities.includes(activity.id)}
                onChange={(e) => handleCheckboxChange(e, activity.id)}
              />
              {activity.name}
            </label>
          </div>
        ))}

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
