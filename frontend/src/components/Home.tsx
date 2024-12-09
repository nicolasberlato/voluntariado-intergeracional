import './Home.css'
import Img1 from '../assets/img1.jpg'
import Img2 from "../assets/img2.jpg";

function Home() {

    return (
      <div className="home">
        <h1>NOME DO SITE</h1>
        <nav>
          <ul>
            <li>HOME</li>
            <li>LOGIN</li>
          </ul>
        </nav>
        <hr />
        <div className="conteudo">
          <div className="sobre">
            <p>
              Sobre o site...
            </p>
            <div className="imagens">
              <img src={Img1}></img>
              <img src={Img2}></img>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;