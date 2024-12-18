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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData({
          ...response.data,
          activities: response.data.activities.map(
            (activity: Activity) => activity.id
          ),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const requestBody: Partial<ProfileData> = {};
    if (profileData.name !== "") requestBody.name = profileData.name;
    if (profileData.email !== "") requestBody.email = profileData.email;
    if (profileData.address.cep !== "")
      requestBody.address = profileData.address;
    if (profileData.activities.length > 0)
      requestBody.activities = profileData.activities;

    try {
      const response = await axios.put(
        `http://localhost:8080/users/me`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Editado com sucesso!");
      navigate("/landingpage");
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile:", error);
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
          placeholder={profileData.name || "Nome"}
        />
        <input
          type="email"
          className="input-email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          placeholder={profileData.email || "E-mail"}
        />
        <input
          type="text"
          name="cep"
          value={profileData.address.cep}
          onChange={handleChange}
          placeholder={profileData.address.cep || "CEP"}
          maxLength={8}
        />
        <input
          type="text"
          name="localidade"
          value={profileData.address.localidade}
          placeholder={profileData.address.localidade || "Cidade"}
          readOnly
        />
        <input
          type="text"
          name="logradouro"
          value={profileData.address.logradouro}
          placeholder={profileData.address.logradouro || "Logradouro"}
          readOnly
        />
        <input
          type="text"
          name="bairro"
          value={profileData.address.bairro}
          placeholder={profileData.address.bairro || "Bairro"}
          readOnly
        />
        <input
          type="text"
          name="estado"
          value={profileData.address.estado}
          placeholder={profileData.address.estado || "Estado"}
          readOnly
        />
        <input
          type="text"
          name="numero"
          value={profileData.address.numero}
          onChange={handleChange}
          placeholder={profileData.address.numero || "Número"}
        />
        <input
          type="text"
          name="complemento"
          value={profileData.address.complemento}
          onChange={handleChange}
          placeholder={profileData.address.complemento || "Complemento"}
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
