import { Link } from "react-router-dom";

function Perfil() {
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
    </div>
  );
}

export default Perfil;
