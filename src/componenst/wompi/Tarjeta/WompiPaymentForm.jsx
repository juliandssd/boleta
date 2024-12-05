import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CreditCard, AlertCircle, Clock, Lock, ChevronRight, ChevronLeft,Wallet ,DollarSign,CheckCircle  } from 'lucide-react';
import { handleTokenizeCard } from './tokenizeCard';
import { useidusuariodetallepago } from '../../../useUserStore';
import { detallesumporconfirmar } from '../../../api/Taskdetalle';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

// Nuevo componente para la advertencia
const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 12px;
  color: #eab308;
  margin-bottom: 24px;
  animation: ${slideUp} 0.3s ease;
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e1e2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(17, 17, 27, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  padding: 2px;
`;

const FormContainer = styled.div`
  padding: 32px;
  background: #13131d;
  border-radius: 22px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  animation: ${float} 3s ease infinite;
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  animation: ${slideUp} 0.5s ease backwards;
  animation-delay: ${props => props.delay || '0s'};

  &.split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

const Label = styled.label`
  display: block;
  color: #a1a1aa;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 15px;
  transition: border-color 0.3s ease, background 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #52525b;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  &:hover:not(:disabled) {
    border-color: rgba(220, 38, 38, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 32px;
  animation: ${slideUp} 0.5s ease backwards;
  animation-delay: 0.4s;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.success ? 
    'linear-gradient(90deg, #22c55e, #16a34a, #22c55e)' : 
    'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)'
  };
  background-size: 200% auto;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    animation: ${shine} 3s linear infinite;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover:not(:disabled) svg {
    transform: ${props => props.success ? 'translateX(-4px)' : 'translateX(4px)'};
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  color: #71717a;
  font-size: 13px;
  animation: ${slideUp} 0.5s ease backwards;
  animation-delay: 0.5s;
`;
const TotalAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
  animation: ${slideUp} 0.5s ease backwards;
`;

const TotalLabel = styled.span`
  color: #a1a1aa;
  font-size: 14px;
  font-weight: 500;
`;

const Amount = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  color: #ef4444;
  margin-bottom: 24px;
  animation: ${slideUp} 0.3s ease;
`;
const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  color: #22c55e;
  margin-bottom: 24px;
  animation: ${slideUp} 0.3s ease;
`;


const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    firstName: 'Campillo',
    lastName: 'Julian',
    expiryDate: '',
    cvc: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(360);
  const { idusuariodetallepago } = useidusuariodetallepago();
  const [total,settotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = '¿Estás seguro? Los datos del formulario se perderán si recargas la página.';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
   
    window.addEventListener('beforeunload', handleBeforeUnload);
   
    if (timeLeft === 0) {
      setError('Session expired. Please refresh to start again.');
      return;
    }
   
    let timer;
    if (!success) {
      timer = setInterval(() => {
        if (success) {
          setTimeLeft(0);
          clearInterval(timer);
        } else {
          setTimeLeft(prev => prev - 1);
        }
      }, 1000);
    } else {
      setTimeLeft(0);
    }
   
    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
   }, [timeLeft, success]); // Add success to dependencies
  

  useEffect(()=>{
const Fetdata =async ()=>{
  try {
    const response =  await detallesumporconfirmar({id:idusuariodetallepago});
    settotal(response.data.Monto);
  } catch (error) {
  }
}
Fetdata();
  }

  ,[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      setError('Session expired. Please refresh to start again.');
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const result = await handleTokenizeCard(formData, setError, setLoading, idusuariodetallepago);
      if (result) {
        setSuccess(true);
        setError('');
      } else {
        setError('Lo sentimos, no pudimos procesar tu pago en este momento.');
      }
    } catch (err) {
      setSuccess(false);
      setError('Error en el proceso de pago');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO').format(number);
  };
  const handleBack = () => {
    navigate('/'); // Ajusta esta ruta según tu necesidad
  };
  return (
    <Container>
      <Card>
        <FormContainer>
          <WarningMessage>
            <AlertCircle size={20} />
            ¡Atención! Si recargas la página perderás todos los datos ingresados.
          </WarningMessage>

          <Header>
            <Title>
              <Wallet size={24} color="#dc2626" />
              Eventos Live
            </Title>
            <Timer>
              <Clock size={18} />
              {formatTimeLeft(timeLeft)}
            </Timer>
          </Header>
          <TotalAmount>
            <TotalLabel>Total a pagar:</TotalLabel>
            <Amount>
              <DollarSign size={20} color="#dc2626" />
              {formatNumber(total)} COP
            </Amount>
          </TotalAmount>
          {error && (
            <ErrorMessage>
              <AlertCircle size={20} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <CheckCircle size={20} />
              Pago exitoso. Puedes consultar tu entrada con tu usuario en la app
            </SuccessMessage>
          )}

          <form onSubmit={handleSubmit}>
            <FormGroup delay="0.1s">
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                disabled={loading || timeLeft === 0}
              />
            </FormGroup>
            <FormGroup className="split" delay="0.3s">
              <div>
                <Label>Expiry Date</Label>
                <Input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  disabled={loading || timeLeft === 0}
                />
              </div>
              <div>
                <Label>CVC</Label>
                <Input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  disabled={loading || timeLeft === 0}
                />
              </div>
            </FormGroup>
            <ButtonContainer>
  {(success || timeLeft === 0) ? (
    <Button 
      success 
      type="button" 
      onClick={handleBack}
    >
      <ChevronLeft size={20} />
      Volver al menú principal
    </Button>
  ) : (
    <Button 
      type="submit" 
      disabled={loading || timeLeft === 0}
    >
      {loading ? 'Processing...' : 'Pagar Ahora'}
      <ChevronRight size={20} />
    </Button>
  )}
</ButtonContainer>

            <SecurityBadge>
              <Lock size={14} />
              Secured by 256-bit SSL encryption
            </SecurityBadge>
          </form>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default PaymentForm;