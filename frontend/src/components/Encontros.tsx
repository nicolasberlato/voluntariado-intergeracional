import { Link } from "react-router-dom";
import './styles/Encontros.css'

function Encontros() {
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
          <h3 className="">Encontros marcados: </h3>

          <h3>Encontros passados: </h3>
        </div>
      </div>
    );
}

export default Encontros;