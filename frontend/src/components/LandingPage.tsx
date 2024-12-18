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
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };
      handleFilter(newFilters);
      return newFilters;
    });
  };

  const handleFilter = async (activeFilters: Record<string, string>) => {
    const userType = localStorage.getItem("userType");
    const targetType = userType === "usuario" ? "voluntario" : "usuario";

    if (Object.keys(activeFilters).length === 0) {
      console.error("No filters selected.");
      return;
    }

    try {
      const queryString = new URLSearchParams(activeFilters).toString();
      const response = await axios.get(
        `http://localhost:8080/users/${targetType}?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFiltering(true);
      setFilteredProfiles(response.data);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
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
      <hr />
      <div className="div-filtros">
        <button
          id="btn-filtrar-regiao"
          onClick={() =>
            handleFilterChange(
              "localidade",
              localStorage.getItem("userAddress") || ""
            )
          }
        >
          Filtrar por região
        </button>
        <br />
        <select
          id="atividade"
          value={filters.atividades || ""}
          onChange={(e) => handleFilterChange("atividades", e.target.value)}
        >
          <option value="" disabled>
            Escolha uma atividade:
          </option>
          <option value="Tarefas domésticas">Tarefas domésticas</option>
          <option value="Ajuda com tecnologia">Ajuda com tecnologia</option>
          <option value="Leitura">Leitura</option>
          <option value="Atividades ao ar livre">Atividades ao ar livre</option>
          <option value="Companhia">Companhia</option>
          <option value="Conversar">Conversar</option>
          <option value="Atividades físicas">Atividades físicas</option>
        </select>
      </div>

      <div className="parent">
        <div className="container">
          {(isFiltering ? filteredProfiles : profiles).length === 0 ? (
            <p>No profiles found matching the filter.</p>
          ) : (
            (isFiltering ? filteredProfiles : profiles).map((user, index) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
