import { Link } from "react-router-dom";


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
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  );
}

export default Login;
