import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './LandingPage.css'

function LandingPage() {

function handleLogout() {

}

  return (
    <div className="landingpage">
      <h1>NOME DO SITE</h1>
      <nav>
        <ul>
          <Link to="/perfil">
            <li>PERFIL</li>
          </Link>
          <Link to="/mensagens">
            <li>MENSAGENS</li>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <li>LOGOUT</li>
          </Link>
        </ul>
      </nav>
      <ul className="filtros">
        <li>Filtrar por região</li>
        <li>Filtrar por atividades</li>
      </ul>

      <div className="parent">
        <div className="container">
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
          <div className="perfil">
            <h3>Nome</h3>
            <p>Idade</p>
            <p>Lista de interesses</p>
            <p>Cidade</p>
            <Link to="/mensagens">
              <p id="btnMensagem">Mandar mensagem</p>
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default LandingPage;
