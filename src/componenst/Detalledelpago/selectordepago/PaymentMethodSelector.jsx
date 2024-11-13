import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CreditCard, Wallet, Building2, ChevronRight, ShoppingCart, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(90deg, #FF3366, #FF0000, #FF3366);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 3s linear infinite;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 51, 102, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 51, 102, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 51, 102, 0.5); }
`;

const PaymentCard = styled.div`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#FF3366' : 'transparent'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${props => props.selected ? glowAnimation : 'none'} 2s infinite;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(30, 30, 30, 0.9);
  }

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255,51,102,0.1) 0%, transparent 70%);
    transition: all 0.5s ease;
    opacity: ${props => props.selected ? 1 : 0};
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: ${props => props.selected ? 
    'linear-gradient(135deg, #FF3366, #FF0000)' : 
    'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  animation: ${float} 3s ease infinite;

  svg {
    color: ${props => props.selected ? '#fff' : '#FF3366'};
    transition: all 0.3s ease;
    font-size: 2rem;
  }
`;

const MethodTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.selected ? '#FF3366' : '#fff'};
  transition: all 0.3s ease;
`;

const MethodDescription = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
`;

const ButtonBase = styled.button`
  padding: 1.5rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  width: 100%;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transition: all 0.5s ease;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ContinueButton = styled(ButtonBase)`
  background: ${props => props.disabled ? 
    'rgba(255, 51, 102, 0.2)' : 
    'linear-gradient(90deg, #FF3366, #FF0000)'};
  color: white;
  border: none;
  backdrop-filter: blur(5px);
`;

const ShoppingButton = styled(ButtonBase)`
  background: rgba(255, 51, 102, 0.1);
  backdrop-filter: blur(5px);
  border: 2px solid #FF3366;
  color: #FF3366;

  &:hover {
    background: rgba(255, 51, 102, 0.2);
  }
`;

const PaymentSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();
  const paymentMethods = [
    {
      id: 'credit',
      title: 'Tarjeta de Crédito o Débito',
      icon: <CreditCard size={28} />,
      description: '"Paga fácil y seguro con tu tarjeta de crédito o débito. Proceso cifrado de inicio a fin y tus entradas digitales llegarán a tu App al instante.'
    },
    {
      id: 'bank',
      title: 'PSE',
      icon: <Building2 size={28} />,
      description: '"Con PSE, transfiere directamente desde tu banca en línea con total seguridad. Sin comisiones extra, confirmación inmediata y tus entradas digitales en tu correo al instante.'
    },
    {
      id: 'cash',
      title: 'Corresponsales bancolombia',
      icon: <Wallet size={28} />,
      description: 'Paga fácilmente en puntos autorizados y recibe tus entradas digitales en tu App. La comodidad de pagar en efectivo con la facilidad de entradas virtuales'
    }
  ];
const btnselect=async ()=>{
  if(selectedMethod==='credit'){
    navigate('/pagos/tarjeta')

  }else if (selectedMethod==='bank'){
navigate('/pagos/pse');
  }else{
navigate('/pagos/bancolombia');
  }
}
  return (
    <Container>
      <Wrapper>
        <Header>
          <Title>Método de Pago</Title>
        </Header>

        <Grid>
          {paymentMethods.map((method) => (
            <PaymentCard
              key={method.id}
              selected={selectedMethod === method.id}
              onClick={() => setSelectedMethod(method.id)}
            >
              <IconContainer selected={selectedMethod === method.id}>
                {method.icon}
              </IconContainer>
              <MethodTitle selected={selectedMethod === method.id}>
                {method.title}
              </MethodTitle>
              <MethodDescription>{method.description}</MethodDescription>
            </PaymentCard>
          ))}
        </Grid>

        <ButtonContainer>
          <ContinueButton onClick={btnselect} disabled={!selectedMethod}>
            <Sparkles size={20} />
            Finalizar Compra
            <ChevronRight size={20} />
          </ContinueButton>
          
          <ShoppingButton>
            <ShoppingCart size={20} />
            Seguir Comprando
          </ShoppingButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default PaymentSelector;