import { Link } from "react-router-dom";
import './Login.css'

function Login() {

const handleSubmit = () => {
 //enviar para o back
}

  return (
    <div className="signup">
      <h1>NOME DO SITE</h1>
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
      <h2>LOGIN: </h2>
      <form onSubmit={handleSubmit}>
        <input id='logininput' type="email" placeholder="EMAIL: " name="email"/>
        <input id='logininput' type="password" placeholder="SENHA: " name="password"/>
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default Login;
