import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./styles/MarcarEncontro.css";

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
  meeting: Meeting[];
}

interface Activity {
  id: number;
  description: string;
}

interface Meeting {
  user1Id: string,
  user2: User | null;
  scheduledDate: string;
  location: string;
  description: string;
  type: string;
}

const MarcarEncontro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");


  if (!token) {
    alert("Token is missing. Please log in again.");
    navigate("/login");
    return;
  }

  const { user2 } = location.state || {};

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login");
    }
  }, [token, navigate]);

  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [meeting, setMeeting] = useState<Meeting>({
    user1Id: "",
    user2: user2,
    scheduledDate: "",
    location: "",
    description: "",
    type: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMeeting({
      ...meeting,
      [name]: value,
    });
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeeting({
      ...meeting,
      description: event.target.value,
    });
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMeeting({
      ...meeting,
      location: event.target.value,
    });
  };

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const user1IdFromLocalStorage = localStorage.getItem("userId");

    console.log(
      user1IdFromLocalStorage,
      meeting.user2?.id,
      scheduledDate,
      meeting.location,
      meeting.description,
      meeting.type
    );
    try {
      const requestData = {
        user1Id: user1IdFromLocalStorage,
        user2Id: meeting.user2?.id,
        scheduledDate: scheduledDate,
        location: meeting.location,
        description: meeting.description,
        type: meeting.type,
      };
      console.log(requestData);

      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/meetings/new",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Convite enviado!");
        navigate("/landingpage");
      }
    } catch (error: any) {
      console.error("Erro ao enviar o convite:", error);
      if (axios.isAxiosError(error)) {
        alert(
          `Erro ao enviar o convite: ${error.response?.data || error.message}`
        );
      } else {
        alert("Erro ao enviar o convite.");
      }
    }
  };

    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    };

  return (
    <div className="marcarencontro">
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
      <div className="cardEncontro">
        {meeting.user2 ? (
          <p className="encontro">
            Você deseja marcar um encontro com {meeting.user2.name}?
          </p>
        ) : (
          <p className="encontro">Nenhum usuário selecionado.</p>
        )}
        <form onSubmit={handleClick}>
          <label id="label-presencial">
            <input
              id="presencial"
              type="radio"
              name="type"
              value="PRESENCIAL"
              checked={meeting.type === "PRESENCIAL"}
              onChange={handleChange}
            />
            Presencial
          </label>

          <label id="label-virtual">
            <input
              id="virtual"
              type="radio"
              name="type"
              value="VIRTUAL"
              checked={meeting.type === "VIRTUAL"}
              onChange={handleChange}
            />
            Virtual
          </label>

          <input
            type="text"
            name="description"
            placeholder="Descreva a atividade que deseja realizar..."
            value={meeting.description}
            onChange={handleDescriptionChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Onde? Ex.: Parque da cidade..."
            value={meeting.location}
            onChange={handleLocationChange}
          />
          <input
            type="datetime-local"
            id="datetime-local"
            value={scheduledDate}
            onChange={(e) => {
              const dateTime = e.target.value;
              const formattedDateTime = dateTime + ":00";
              setScheduledDate(formattedDateTime);
            }}
          />
          <button className="btnEnviaConvite" type="submit">
            Enviar Convite
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarcarEncontro;
