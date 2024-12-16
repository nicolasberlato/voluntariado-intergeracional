import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Encontros.css";

interface Meeting {
  id: number;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  description: string;
  type: string;
  status: string;
}

function Encontros() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          alert("User not authenticated");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/${userId}/history`,
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
  }, []);

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
        <h4>Histórico de encontros:</h4>
        <div id="encontros">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card">
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
