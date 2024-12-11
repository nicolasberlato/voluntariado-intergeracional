import './Home.css'
import Img1 from '../assets/img1.jpg'
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img3.jpg";
import { Link } from 'react-router-dom';

function Home() {

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
        <div className="conteudo">
          <div className="sobre">
            <p className='sobretexto'>
              Sobre o site...Sobre o site...Sobre o site...Sobre o site...Sobre
              o site... Sobre o site...
            </p>
            <div className="imagens">
              <img src={Img1}></img>
              <img src={Img2}></img>
              <img src={Img3}></img>
            </div>
          </div>
          <Link to="/signup">
            <button>CADASTRE-SE</button>
          </Link>
        </div>
      </div>
    );
}

export default Home;