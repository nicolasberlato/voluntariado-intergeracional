import { Link, useNavigate } from "react-router-dom";
import "./styles/LandingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Activity {
  id: number;
  description: string;
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
}

function LandingPage() {
  const [profiles, setProfiles] = useState<User[]>([]);
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
        const targetType = userType === "usuario" ? "voluntatio" : "usuario";

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
    navigate("/marcarencontro", {
      state: {
        userName: user.name,
        userId: user.id,
        userAddress: user.address.localidade,
      },
    });
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };

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
          <Link to="/historico">
            <li>HISTÓRICO</li>
          </Link>
          <li onClick={handleLogout}>LOGOUT</li>
        </ul>
      </nav>
      <ul className="filtros">
        <li>Filtrar por região</li>
        <li>Filtrar por atividades</li>
      </ul>
      <hr />
      <div className="parent">
        <div className="container">
          {profiles.map((user, index) => (
            <div className="perfil" key={index}>
              <h3>{user.name}</h3>
              <p>
                Lista de atividades:{" "}
                {user.activities
                  .map((activity: Activity) => activity.description)
                  .join(", ")}
              </p>
              <p>Cidade: {user.address.localidade}</p>
              <button onClick={() => handleClick(user)}>Marcar Encontro</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
