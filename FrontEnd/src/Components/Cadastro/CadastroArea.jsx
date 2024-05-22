import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../App';
import MainMobile from '../layouts/MainMobile/MainMobile';
import ChronnosInput from '../inputs-buttons/ChronnosInput/ChronnosInput';
import ChronnosButton from '../inputs-buttons/ChronnosButton/ChronnosButton';

const CadastroArea = () => {
  const { RotaBanco } = useGlobalContext();
  const [nomeArea, setNomeArea] = useState('');
  const [cor, setCor] = useState('');
  const [idUsuario, setIdUsuario] = useState(null);

  // Efeito para obter o ID do usuário do cookie quando o componente é montado
  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'usuario') {
        const userData = JSON.parse(decodeURIComponent(cookieValue));
        setIdUsuario(userData.ID_USUARIO);
        break;
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = {
      idUsuario: idUsuario,
      nomeArea: nomeArea,
      Cor: cor
    };

    try {
      const response = await fetch(RotaBanco + '/usuarios/adicionarArea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });



      const data = await response.json();
      //Necessário mensagem de sucesso
    } catch (error) {
      console.error('kleidson:', error);
      //transformar esse console num pop-up de erro
    }
  };

  return (
    <MainMobile className="main-mob-cent">
      <h1>Cadastro de área</h1>
      <ChronnosInput className="input-default" type="text" placeholder="Nome da Área" value={nomeArea} onChange={(e) => setNomeArea(e.target.value)}></ChronnosInput>
      <ChronnosInput className="input-default" type="text" placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)}></ChronnosInput>
      <ChronnosButton className="button-default" onClick={handleSubmit}>Adicionar Área</ChronnosButton> 
    </MainMobile>
  );
};

export default CadastroArea;
