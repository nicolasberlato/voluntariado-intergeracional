import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="home">
      <h1>NOME DO SITE</h1>
      <nav>
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <Link to="/login">
            <li>LOGIN</li>
          </Link>
        </ul>
      </nav>
      <hr />
    </div>
  );
}

export default Signup;
