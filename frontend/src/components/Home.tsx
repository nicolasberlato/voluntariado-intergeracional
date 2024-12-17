import './styles/Home.css';
import Img1 from '../assets/img1.jpg'
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img3.jpg";
import Img4 from "../assets/img4.jpg";
import { Link, useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    return (
      <div className="home">
        <h1>AFETO CONECTA</h1>
        <nav>
          <ul>
            <Link to="/login">
              <li>LOGIN</li>
            </Link>
          </ul>
        </nav>
        <hr />
        <div className="conteudo">
          <h2 className="bemvindo">Bem-vindo ao Afeto Conecta!🌿💫🤝</h2>
          <div className="sobre">
            <p className="sobretexto">
              <strong>Afeto Conecta</strong> é uma plataforma que promove
              encontros entre voluntários e idosos para atividades conjuntas,
              como passeios, assistência tecnológica e leitura. Nosso objetivo é
              melhorar a qualidade de vida de ambos os grupos, fortalecendo
              laços sociais e criando momentos significativos por meio da
              solidariedade e do compartilhamento de experiências.
            </p>
            <div className="imagens">
              <img src={Img1}></img>
              <img src={Img2}></img>
              <img src={Img3}></img>
              <img src={Img4}></img>
            </div>
          </div>
          <button className="btnCadastro" onClick={() => navigate("/signup")}>
            CADASTRE-SE
          </button>
        </div>
      </div>
    );
}

export default Home;