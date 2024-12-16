import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import Date from "./Date"; 
import "./styles/MarcarEncontro.css";

interface Meeting {
  id: number;
  user1: {
    id: number;
    name: string;
    initiatedMeetings: {};
    receivedMeetings: {};
  };
  user2: {};
  meetingType: string;
  meetingStatus: string;
  location: string;
  description: string;
  scheduledDate: string;
  user1Confirmed: boolean;
  user2Confirmed: boolean;
}

const MarcarEncontro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName } = location.state || {};

  const [meeting, setMeeting] = useState<Meeting>({
    id: 0,
    user1: "",
    user2: "",
    meetingType: "",
    meetingStatus: "",
    location: "",
    description: "",
    scheduledDate: "",
    user1Confirmed: false,
    user2Confirmed: false,
  });

  const [scheduledTime, setScheduledTime] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setMeeting({
      ...meeting,
      [name]: value,
    });
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMeeting({
      ...meeting,
      description: event.target.value,
    });
  }

  function handleTimeChange(event: ChangeEvent<HTMLInputElement>) {
    setScheduledTime(event.target.value);
  }

  function handleClick() {
    alert("Convite enviado");
    navigate("/landingpage");
  }

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
        {userName ? (
          <p className="encontro">
            Você deseja marcar um encontro com {userName}?
          </p>
        ) : (
          <p className="encontro">Nenhum usuário selecionado.</p>
        )}

        <label>
          <input
            id="presencial"
            type="radio"
            name="meetingType"
            value="PRESENCIAL"
            checked={meeting.meetingType === "PRESENCIAL"}
            onChange={handleChange}
          />
          Presencial
        </label>

        <label>
          <input
            id="virtual"
            type="radio"
            name="meetingType"
            value="VIRTUAL"
            checked={meeting.meetingType === "VIRTUAL"}
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

        <Date
          selectedDate={meeting.scheduledDate}
          onChange={(date: string) =>
            setMeeting({ ...meeting, scheduledDate: date })
          }
        />

        <input
          name="scheduledDate"
          id="hora"
          type="time"
          value={scheduledTime}
          onChange={handleTimeChange}
        />

        <button className="btnEnviaConvite" onClick={handleClick}>
          Enviar Convite
        </button>
      </div>
    </div>
  );
};

export default MarcarEncontro;
