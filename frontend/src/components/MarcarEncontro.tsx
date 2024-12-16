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
  user1: User | null;
  user2: User | null;
  scheduledDate: string;
  location: string;
  description: string;
  type: string;
  status: string;
  user1Confirmed: boolean;
  user2Confirmed: boolean;
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

  const { user1, user2 } = location.state || {};

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login");
    }
  }, [token, navigate]);

  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [meeting, setMeeting] = useState<Meeting>({
    user1: user1,
    user2: user2,
    scheduledDate: "",
    location: "",
    description: "",
    type: "",
    status: "PENDING",
    user1Confirmed: true,
    user2Confirmed: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMeeting({
      ...meeting,
      [name]: value,
    });
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMeeting({
      ...meeting,
      description: event.target.value,
    });
  };

  const handleLocationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMeeting({
      ...meeting,
      location: event.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const formattedDate = new Date(scheduledDate).toISOString();

      const requestData = {
        user1Id: meeting.user1?.id,
        user2Id: meeting.user2?.id,
        scheduledDate: formattedDate,
        location: meeting.location,
        description: meeting.description,
        type: meeting.type,
      };

      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/meetings/new",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Convite enviado!");
        navigate("/landingpage");
      } else {
        alert("Erro ao enviar o convite.");
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

  return (
    <div className="marcarencontro">
      <h1>AFETO CONECTA</h1>
      <nav>
        <ul>
          <Link to="/landingpage">
            <li>HOME</li>
          </Link>
          <Link to="/logout">
            <li>LOGOUT</li>
          </Link>
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

        <label>
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

        <label>
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

        <textarea
          rows={5}
          name="description"
          placeholder="Descreva a atividade que deseja realizar..."
          value={meeting.description}
          onChange={handleDescriptionChange}
        />
        <textarea
          rows={5}
          name="location"
          placeholder="Descreva a atividade que deseja realizar..."
          value={meeting.location}
          onChange={handleLocationChange}
        />
        <input
          type="datetime-local"
          id="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />

        <button className="btnEnviaConvite" onClick={handleClick}>
          Enviar Convite
        </button>
      </div>
    </div>
  );
};

export default MarcarEncontro;