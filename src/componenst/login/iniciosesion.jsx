import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usuariovalidar } from '../../api/Taskusuario';
import validator from 'validator';
import { useStoreEncryp } from '../../useUserStore';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
  body {
    font-family: 'Montserrat', sans-serif;
    background: #0D0000;
    margin: 0;
    padding: 0;
    color: #fff;
    overflow-x: hidden;
  }
`;

const hyperFlow = keyframes`
  0% {
    background-position: 0% 50%;
    backdrop-filter: blur(10px) saturate(150%);
  }
  50% {
    background-position: 100% 50%;
    backdrop-filter: blur(15px) saturate(200%);
  }
  100% {
    background-position: 0% 50%;
    backdrop-filter: blur(10px) saturate(150%);
  }
`;

const energyPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 0, 0, 0.3),
      inset 0 0 20px rgba(255, 0, 0, 0.3);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(255, 0, 0, 0.5),
      inset 0 0 40px rgba(255, 0, 0, 0.5);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  background: 
    radial-gradient(circle at top right, #2A0000, transparent 50%),
    radial-gradient(circle at bottom left, #1A0000, transparent 50%),
    #0D0000;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 50px,
        rgba(255, 0, 0, 0.03) 50px,
        rgba(255, 0, 0, 0.03) 51px
      );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 50px,
        rgba(255, 0, 0, 0.03) 50px,
        rgba(255, 0, 0, 0.03) 51px
      );
    pointer-events: none;
  }
`;

const hyperShine = keyframes`
  0% {
    transform: translateX(-100%) skew(-15deg);
  }
  100% {
    transform: translateX(200%) skew(-15deg);
  }
`;

const MainCard = styled.div`
  width: 100%;
  max-width: 1400px;
  background: rgba(20, 0, 0, 0.7);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  position: relative;
  overflow: hidden;
  animation: ${hyperFlow} 8s infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 0, 0.1);
  box-shadow: 0 0 100px rgba(255, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 0, 0, 0.2),
      transparent
    );
    transform: translateX(-100%) skew(-15deg);
    animation: ${hyperShine} 8s ease-in-out infinite;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const redEnergy = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const BrandSection = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: 
    linear-gradient(
      135deg,
      rgba(255, 0, 0, 0.1),
      transparent 60%
    );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      #FF0000,
      #CC0000,
      #FF0000
    );
    opacity: 0.05;
    background-size: 200% 200%;
    animation: ${redEnergy} 5s ease infinite;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const glitchText = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
    transform: translate(0);
  }
  20% {
    text-shadow: -2px 0 10px rgba(255, 0, 0, 0.8);
    transform: translate(2px, -2px);
  }
  40% {
    text-shadow: 2px 0 10px rgba(255, 0, 0, 0.8);
    transform: translate(-2px, 2px);
  }
  60% {
    text-shadow: 0 2px 10px rgba(255, 0, 0, 0.8);
    transform: translate(2px, 2px);
  }
  80% {
    text-shadow: 0 -2px 10px rgba(255, 0, 0, 0.8);
    transform: translate(-2px, -2px);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
    transform: translate(0);
  }
`;

const Logo = styled.h1`
  font-family: 'Syncopate', sans-serif;
  font-size: 7rem;
  font-weight: 900;
  margin: 0;
  color: #FFF;
  text-transform: uppercase;
  letter-spacing: -5px;
  position: relative;
  animation: ${glitchText} 5s infinite;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);

  &::before {
    content: 'SISTEMA';
    position: absolute;
    top: -2rem;
    left: 0.5rem;
    font-size: 1rem;
    letter-spacing: 1rem;
    color: rgba(255, 0, 0, 0.8);
  }

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2rem;
  line-height: 1.6;
  letter-spacing: 4px;
  font-weight: 300;
  text-transform: uppercase;
`;

const FormSection = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    background: linear-gradient(45deg, transparent 48%, rgba(255, 0, 0, 0.2) 50%, transparent 52%);
    background-size: 10px 10px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const InputWrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 0, 0, 0.2);
    pointer-events: none;
  }
`;

const inputHighlight = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem;
  background: rgba(20, 0, 0, 0.6);
  border: none;
  color: #FFF;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(40, 0, 0, 0.6);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);

    & + span {
      width: 100%;
    }
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 2px;
  }
`;

const InputHighlight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #FF0000, transparent);
  transition: width 0.3s ease;
`;

const energyButton = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Button = styled.button`
  padding: 1.5rem;
  background: linear-gradient(45deg, #FF0000, #CC0000, #FF0000);
  background-size: 200% 200%;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${energyButton} 3s infinite;
  position: relative;
  overflow: hidden;

  &:hover {
    animation: ${energyButton} 2s infinite, ${energyPulse} 2s infinite;
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(45deg);
    transition: 0.5s;
  }

  &:hover::before {
    transform: rotate(45deg) translate(50%, 50%);
  }
`;

const RegisterButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(255, 0, 0, 0.3);
  animation: none;

  &:hover {
    background: rgba(255, 0, 0, 0.1);
    animation: ${energyPulse} 2s infinite;
    border-color: #FF0000;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: #FF0000;
  font-size: 0.9rem;
  letter-spacing: 1px;
  animation: ${energyPulse} 2s infinite;
`;

const Login = () => {
  const navigate = useNavigate();
  const setEncryptedId = useStoreEncryp((state) => state.setEncryptedId);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validator.isEmail(correo)) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }

    if (!password) {
      setError('Por favor, introduce tu contraseña');
      return;
    }

    try {
      const response = await usuariovalidar({ user: correo, pass: password });
      if (response.status === 200) {
        setEncryptedId(response.data.id_usuario);
        navigate(-1);
      }
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <MainCard>
          <BrandSection>
            <Logo>TIKET</Logo>
            <Tagline>
              ACCESO NEXO-RED
              <br />
              INTERFAZ DE CONTROL PREMIUM
            </Tagline>
          </BrandSection>

          <FormSection>
            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Correo"
                />
                <InputHighlight />
              </InputWrapper>

              <InputWrapper>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <InputHighlight />
              </InputWrapper>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Button type="submit">
                INICIAR SESIÓN
              </Button>

              <RegisterButton type="button" onClick={() => navigate('/register')}>
                CREAR CUENTA
              </RegisterButton>
            </Form>
          </FormSection>
        </MainCard>
      </Container>
    </>
  );
};

export default Login;