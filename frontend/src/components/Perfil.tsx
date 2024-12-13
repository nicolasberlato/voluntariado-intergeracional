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
      <div className="cardPerfil">
        <p>Nome:</p>
        <p>Email:</p>
        <p>Senha:</p>
        <p>Data de nascimento:</p>
        <p>CEP:</p>
        <p>Numero:</p>
        <p>Complemento:</p>
        <p>Atividades:</p>
        <button>Excluir perfil</button>
      </div>
    </div>
  );
}

export default Perfil;
