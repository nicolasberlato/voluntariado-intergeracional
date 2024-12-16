import { Link, useNavigate } from "react-router-dom";
import "./styles/LandingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Activity {
  id: number;
  description: string;
}

interface Meeting {
  user1: User | null;
  user2: User | null;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  description: string;
  type: string;
  status: string;
  user1Confirmed: boolean;
  user2Confirmed: boolean;
}


interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: string;
  address: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    estado: string;
    numero: string;
  };
  activities: Activity[];
  meetings: Meeting[];
}

function LandingPage() {
  const [profiles, setProfiles] = useState<User[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const userType = localStorage.getItem("userType");
        const targetType = userType === "usuario" ? "voluntario" : "usuario";

        const response = await axios.get(
          `http://localhost:8080/users/${targetType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [navigate]);

  const handleClick = (user: User) => {
      const user1 = {
    id: Number(localStorage.getItem("userId")),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    userType: localStorage.getItem("userType"),
    address: JSON.parse(localStorage.getItem("address") || "{}"), 
    activities: JSON.parse(localStorage.getItem("activities") || "[]"),
    meetings: JSON.parse(localStorage.getItem("meetings") || "[]"),
  };

   const token = localStorage.getItem("token");

    navigate("/marcarencontro", {
      state: {
        token: token,
        user1,
        user2: user,
      },
    });
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };

   const handleFiltroRegiao = () => {
     const userAddress = JSON.parse(localStorage.getItem("address") || "{}");

     if (userAddress.logradouro) {
       const filtered = profiles.filter(
         (user) =>
           user.address.logradouro.toLowerCase() ===
           userAddress.logradouro.toLowerCase()
       );
       setFilteredProfiles(filtered); 
     } else {
       console.error("Logged-in user's logradouro not found.");
     }
   };

  const handleFiltroAtividade = () => {
   
  }

  return (
    <div className="landingpage">
      <h1>AFETO CONECTA</h1>
      <nav>
        <ul>
          <Link to="/perfil">
            <li>EDITAR PERFIL</li>
          </Link>
          <Link to="/encontros">
            <li>ENCONTROS</li>
          </Link>
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
      <ul className="filtros">
        <li>
          <button id="btnfiltros" onClick={handleFiltroRegiao}>
            Filtrar por região
          </button>
        </li>
        <li>
          <button id="btnfiltros" onClick={handleFiltroAtividade}>
            Filtrar por atividade
          </button>
        </li>
      </ul>
      <hr />
      <div className="parent">
        <div className="container">
          {(filteredProfiles.length > 0 ? filteredProfiles : profiles).map(
            (user, index) => (
              <div className="perfil" key={index}>
                <h3>{user.name}</h3>
                <p>
                  Lista de atividades:{" "}
                  {user.activities
                    .map((activity: Activity) => activity.description)
                    .join(", ")}
                </p>
                <p>Cidade: {user.address.localidade}</p>
                <button onClick={() => handleClick(user)}>
                  Marcar Encontro
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
