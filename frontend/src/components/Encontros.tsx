import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Encontros.css";

interface Meeting {
  id: null;
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
  meetings: Meeting[];
}

function Encontros() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const user1Id = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        console.log(token)
        if (!user1Id || !token) {
          alert("User not authenticated");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/users/${user1Id}/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMeetings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  
  const handleAceitar = (meetingId: number | null) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId
          ? { ...meeting, status: "CONFIRMADO", user2Confirmed: true }
          : meeting
      )
    );
  };

  const handleRecusar = (meetingId: number | null) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, status: "CANCELADO" } : meeting
      )
    );
  };

  return (
    <div className="encontros">
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
      <div className="cardEncontros">
        <h2>Encontros:</h2>
        <div id="encontros">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card">
                <p>
                  <strong>Encontro com </strong>{" "}
                  {meeting.user2?.name || "Não definido"}
                </p>
                <p>
                  <strong>Data:</strong> {meeting.scheduledDate}
                </p>
                <p>
                  <strong>Hora:</strong> {meeting.scheduledTime}
                </p>
                <p>
                  <strong>Local:</strong> {meeting.location}
                </p>
                <p>
                  <strong>Descrição:</strong> {meeting.description}
                </p>
                <p>
                  <strong>Tipo:</strong> {meeting.type}
                </p>
                <p>
                  <strong>Status:</strong> {meeting.status}
                </p>
                <button
                  className="btnAceitar"
                  onClick={() => handleAceitar(meeting.id)}
                >
                  Aceitar
                </button>
                <button
                  className="btnRecusar"
                  onClick={() => handleRecusar(meeting.id)}
                >
                  Recusar
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum encontro encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Encontros;
