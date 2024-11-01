import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useidcreate } from '../../useUserStore';
import { usuarioverificar, usuarioverificarcodigo } from '../../api/Taskusuario';
import { useStoreEncryp } from '../../useUserStore';
import { replace, useNavigate } from 'react-router-dom';
// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const shine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;

// Componentes estilizados
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VerificationCard = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
  animation: ${fadeIn} 0.3s ease;
  max-width: 400px;
  margin: 0 auto;
  gap: 24px;

  @media (min-width: 768px) {
    min-height: auto;
    padding: 48px 24px;
    border-radius: 24px;
  }
`;

const Title = styled.h1`
  color: #808080;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  width: 100%;
  margin: 24px 0;
`;

const CodeInput = styled.input`
  width: 100%;
  aspect-ratio: 1;
  background: transparent;
  border: 1.5px solid #333;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  text-align: center;
  outline: none;
  padding: 0;
  transition: all 0.2s ease;

  &:focus {
    border-color: #ff0000;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.1);
    transform: scale(1.05);
  }
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 0, 0, 0.05);
  border-radius: 20px;
  transition: all 0.3s ease;
`;

const TimeUnit = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeNumber = styled.span`
  color: ${props => props.$isExpiring ? '#ff0000' : '#808080'};
  font-size: 16px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  min-width: 24px;
  text-align: center;
  transition: color 0.3s ease;
`;

const TimeSeparator = styled.span`
  color: #666;
  font-weight: 500;
  ${props => props.$blink && css`
    animation: ${blink} 1s ease-in-out infinite;
  `}
`;

const TimeLabel = styled.span`
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
`;

const TimerMessage = styled.span`
  color: #666;
  font-size: 12px;
  text-align: center;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.$variant === 'primary' ? '18px' : '16px'};
  border-radius: ${props => props.$variant === 'primary' ? '12px' : '8px'};
  font-size: ${props => props.$variant === 'primary' ? '16px' : '14px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;

  ${props => props.$variant === 'primary' && css`
    background: linear-gradient(135deg, #ff3366, #ff0000, #ff3366);
    background-size: 200% 200%;
    animation: ${shine} 3s ease infinite;
    color: white;
    text-transform: uppercase;
    transform-style: preserve-3d;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, #ff3366, #ff0000);
      z-index: -1;
      border-radius: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px) scale(1.01);
      box-shadow: 
        0 10px 20px -10px rgba(255, 0, 0, 0.5),
        0 0 30px rgba(255, 0, 0, 0.1);

      &::before {
        opacity: 1;
      }
      
      &::after {
        opacity: 0.5;
      }
    }

    &:active {
      transform: translateY(0) scale(0.99);
    }

    @media (hover: hover) {
      &:not(:active):hover {
        animation: ${pulse} 1.5s infinite;
      }
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background: transparent;
    color: #808080;
    border: 1.5px solid #333;
    backdrop-filter: blur(5px);

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: #444;
      color: #999;
    }

    &:active {
      background: rgba(255, 255, 255, 0.02);
    }
  `}
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.disabled ? '#666' : '#ff0000'};
  font-size: 14px;
  padding: 8px 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  border-radius: 16px;
  
  ${props => !props.disabled && css`
    &:hover {
      background: rgba(255, 0, 0, 0.05);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  text-align: center;
  padding: 8px 16px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: -16px;
  animation: ${slideUp} 0.3s ease;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  background: #333;
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 16px;

  &::after {
    content: '';
    display: block;
    width: ${props => (props.$progress * 16.66)}%;
    height: 100%;
    background: #ff0000;
    transition: width 0.3s ease;
  }
`;

const VerificacionCodigo = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60);
  const [canResend, setCanResend] = useState(false);
  const setEncryptedId = useStoreEncryp((state) => state.setEncryptedId);
  const idcreate = useidcreate((state) => state.idcreate);
  const navigate = useNavigate();
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTimeUnit = (value) => {
    return value.toString().padStart(2, '0');
  };

  const getProgress = () => {
    return codigo.filter(digit => digit !== '').length;
  };

  const isExpiring = timeLeft <= 60;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const manejarCambio = (index, valor) => {
    if (valor.length > 1) return;
    if (!/^\d*$/.test(valor)) return;

    setError(false);
    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = valor;
    setCodigo(nuevoCodigo);

    if (valor !== '' && index < 5) {
      const nextInput = document.querySelector(`input[name=codigo-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const manejarKeyDown = (index, e) => {
    if (e.key === 'Backspace' && codigo[index] === '' && index > 0) {
      const prevInput = document.querySelector(`input[name=codigo-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const verificarCodigo =async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length === 6) {
      setError(false);
      const response =await usuarioverificarcodigo({_codigo:codigoCompleto,id_usuario:idcreate})
      const data=response.data;
      if (data.message==='correctamente') {
        setEncryptedId(data.id_usuario);
        const respo = await usuarioverificar({id:data.id_usuario});
        if(respo.data.message==='correctamente'){
          navigate('/',{replace:true})
        }
      
      }else{
        alert('Codigo Incorrecto');
      }
    } else {
      setError(true);
    }
  };

  const reenviarCodigo = () => {
    if (!canResend) return;
    console.log('Reenviando código...');
    setTimeLeft(14 * 60);
    setCanResend(false);
  };

  return (
    <Container>
      <VerificationCard>
        <Title>Verificación</Title>
        <Subtitle>Ingrese el código de verificación</Subtitle>
        
        <ProgressBar $progress={getProgress()} />
        
        <InputContainer>
          {codigo.map((digito, index) => (
            <CodeInput
              key={index}
              type="tel"
              inputMode="numeric"
              name={`codigo-${index}`}
              value={digito}
              onChange={(e) => manejarCambio(index, e.target.value)}
              onKeyDown={(e) => manejarKeyDown(index, e)}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </InputContainer>

        {error && (
          <ErrorMessage>
            Por favor completa todos los dígitos
          </ErrorMessage>
        )}

        <TimerContainer>
          {!canResend && (
            <>
              <TimerDisplay>
                <TimeUnit>
                  <TimeNumber $isExpiring={isExpiring}>
                    {formatTimeUnit(minutes)}
                  </TimeNumber>
                  <TimeLabel>min</TimeLabel>
                </TimeUnit>
                <TimeSeparator $blink={isExpiring}>:</TimeSeparator>
                <TimeUnit>
                  <TimeNumber $isExpiring={isExpiring}>
                    {formatTimeUnit(seconds)}
                  </TimeNumber>
                  <TimeLabel>seg</TimeLabel>
                </TimeUnit>
              </TimerDisplay>
              <TimerMessage>
                Tiempo restante para reenviar el código
              </TimerMessage>
            </>
          )}
          <ResendButton 
            onClick={reenviarCodigo}
            disabled={!canResend}
          >
            {canResend ? 'Reenviar código' : 'Espere para reenviar'}
          </ResendButton>
        </TimerContainer>

        <ButtonContainer>
          <Button 
            $variant="primary"
            onClick={verificarCodigo}
          >
            Verificar Código
          </Button>
          <Button 
            $variant="secondary"
            onClick={() => console.log('Volver')}
          >
            Cancelar
          </Button>
        </ButtonContainer>
      </VerificationCard>
    </Container>
  );
};

export default VerificacionCodigo;