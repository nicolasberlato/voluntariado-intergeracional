import { Link, useLocation } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import Date from "./Date";
import './styles/MarcarEncontro.css'

interface Meeting {
  id: number;
  meetingType: string;
}

const MarcarEncontro = () => {
  const location = useLocation();
  const { userName } = location.state || {};

  const [meeting, setMeeting] = useState<Meeting>({ id: 0, meetingType: "" });

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setMeeting({
      ...meeting,
      meetingType: event.target.value,
    });
  }

  return (
    <div className="login">
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
            name="typeMeeting"
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
            name="typeMeeting"
            value="VIRTUAL"
            checked={meeting.meetingType === "VIRTUAL"}
            onChange={handleChange}
          />
          Virtual
        </label>

        <Date />

        <button className="btnEnviaConvite">Enviar Convite</button>
      </div>
    </div>
  );

  
};

export default MarcarEncontro;
