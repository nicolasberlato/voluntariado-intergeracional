import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Encontros.css";

interface Meeting {
  id: number;
  user1: { id: number; name: string };
  user2: { id: number; name: string };
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  description: string;
  type: string;
  status: string;
  user1Confirmed: boolean;
  user2Confirmed: boolean;
}

function Encontros() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const user1Id = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");

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
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [user1Id]);

  const handleAceitar = async (meetingId: number | null) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/meetings/${meetingId}/confirm?userId=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === meetingId
            ? { ...meeting, status: "CONFIRMADO", user2Confirmed: true }
            : meeting
        )
      );
    } catch (error) {
      console.error("Error confirming meeting:", error);
    }
  };

  const handleRecusar = async (meetingId: number | null) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/meetings/${meetingId}/cancel?userId=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === meetingId
            ? { ...meeting, status: "CANCELADO" }
            : meeting
        )
      );
    } catch (error) {
      console.error("Error declining meeting:", error);
    }
  };

   const handleLogout = () => {
     localStorage.clear();
     navigate("/");
   };

  return (
    <div className="encontros">
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
      <div className="cardEncontros">
        <h2>Encontros:</h2>
        <div id="encontros">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card">
                <p>
                  <strong>Encontro com </strong>{" "}
                  {meeting.user2?.id === parseInt(user1Id || "0")
                    ? userName
                    : meeting.user2?.name || "Não definido"}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(meeting.scheduledDate).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Hora:</strong>{" "}
                  {new Date(meeting.scheduledDate).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                {parseInt(user1Id || "0") !== meeting.user1.id && (
                  <button
                    className="btnAceitar"
                    onClick={() => handleAceitar(meeting.id)}
                  >
                    Aceitar
                  </button>
                )}

                <button
                  className="btnRecusar"
                  onClick={() => handleRecusar(meeting.id)}
                >
                  Recusar/Cancelar
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum encontro agendado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Encontros;
