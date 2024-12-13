import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";

function Perfil() {

  const navigate = useNavigate();

  //TODO: mudar function
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response: AxiosResponse = await axios.put(
      "http://localhost:8080/user/register",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Edit successful:", response.data);
    alert("Alterações salvas")
    navigate("/landingpage");
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};
  
  return (
    <div className="login">
      <h1>AFETO CONECTA</h1>
      <nav>
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <Link to="/signup">
            <li>CADASTRE-SE</li>
          </Link>
        </ul>
      </nav>
      <hr />
      <div className="cardPerfil">
        <form id="editarPerfil" onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Senha:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label id="atividadeslabel">Atividades:</label>
          {availableActivities.map((activity) => (
            <div key={activity.id}>
              <label id="atividades">
                <input
                  type="checkbox"
                  name="activities"
                  value={activity.id}
                  checked={formData.activities.includes(activity.id)}
                  onChange={(e) => handleCheckboxChange(e, activity.id)}
                />
                {activity.name}
              </label>
            </div>
          ))}
          <button type="submit">Salvar alterações</button>
        </form>
        <button>Excluir perfil</button>
      </div>
    </div>
  );
}

export default Perfil;
