import React, { useState, useEffect } from 'react';
import ChronnosInput from './inputs-buttons/ChronnosInput/ChronnosInput';
import ChronnosButton from './inputs-buttons/ChronnosButton/ChronnosButton';
import MainMobile from './layouts/MainMobile/MainMobile';
import '../pages/LoginCadastro/styles.css';
import '../Assets/utility.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [btnCriarContaClass, setBtnCriarContaClass] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do pop-up

  useEffect(() => {
    if(nome === '' || email === '' || senha === '') {
      setBtnCriarContaClass('button-insatisfaz');
    } else {
      setBtnCriarContaClass('button-default');
    }    
  }, [nome, email, senha]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      nome: nome,
      email: email,
      senha: senha
    };

    fetch('http://localhost:3000/usuarios/adicionarUsuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuário cadastrado:', data);
        setShowPopup(true); // Exibe o pop-up após o cadastro
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };

  // Função para fechar o pop-up e redirecionar para a tela de login
  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = '/Login';
  };

  return (
    <MainMobile className="main-mob-cent">
      <p className="txt-instrucao">CRIAÇÃO DA CONTA</p>
      <h1 className="txt-titulo">Insira seus dados</h1>
      <form onSubmit={handleSubmit}>
        <ChronnosInput type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required className="input-default" /><br />
        <ChronnosInput type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-default" /><br />
        <ChronnosInput type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required className="input-default" /><br />
        <ChronnosButton type="submit" className={btnCriarContaClass}>Criar conta</ChronnosButton>
      </form>
      <p className="txt-footer">Já possui uma conta? Faça o Login apertando <a href="/Login">aqui</a>.</p>
      {/* Pop-up */}
      {showPopup && (
        <div className="popup">
          <p className="txt-titulo">Usuário cadastrado com sucesso!</p>
          <ChronnosButton type="submit" className={"button-default"} onClick={handleClosePopup}>Retornar ao Login</ChronnosButton>
        </div>
      )}
    </MainMobile>
  );
}

export default CadastroUsuario;