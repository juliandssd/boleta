import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useUserStore}  from '../../useUserStore';
import { empresariovalidarLogin } from '../../api/TaskEmpresario.js'; // Asegúrate de importar tu función correctamente

const LoginContainer = styled.div`
  width: 320px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin: 100px auto;
  text-align: center;
  font-family: Arial, sans-serif;
  border: 3px solid #a09c94;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #ff4500;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #444;
  margin: 10px 0 20px;
`;

const InputWrapper = styled.div`
  width: 80%; 
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  background-color: #2e2e2e;
  color: white;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.5);
  outline: none;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #ff9b00;
  }
`;

const Button = styled.button`
  width: 80%; 
  padding: 10px;
  background-color: #ff0000;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d40000;
  }

  &:disabled {
    background-color: #444;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const LoginForm = () => {
  // Manejar el estado de usuario y contraseña
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUserId = useUserStore((state) => state.setUserId); // Para manejar los errores de validación

  // Función para manejar la validación
  const handleLogin = async () => {
    // Validar que los campos no estén vacíos
    if (!user || !pass) {
      setError('Ambos campos son obligatorios');
      return; // No continuar si los campos están vacíos
    }

    setError(''); // Limpiar el error si todo está bien

    try {
      // Llamar a la función que valida el login en el servidor
      const response = await empresariovalidarLogin(user, pass);
      const data =response.data;
      setUserId(data.id_empresario);
      navigate('/empresario/editar/info');
      
     
      // Aquí puedes manejar la respuesta, como redirigir o mostrar mensajes
    } catch (error) {
      console.error('Error durante la validación:', error);
    }
  };

  return (
    <LoginContainer>
      <Logo>Mall bora bora</Logo>
      <Divider />

      {/* Mostrar mensaje de error si existe */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <InputWrapper>
        <Input 
          type="text" 
          placeholder="USUARIO" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
        />
      </InputWrapper>
      <InputWrapper>
        <Input 
          type="password" 
          placeholder="CONTRASEÑA" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
        />
      </InputWrapper>
      <Button onClick={handleLogin}>INGRESAR</Button>
    </LoginContainer>
  );
};

export default LoginForm;
