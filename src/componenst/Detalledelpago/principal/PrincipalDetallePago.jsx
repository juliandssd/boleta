import React from 'react';
import styled from 'styled-components';
import Header from '../../paginaprincipal/encabezado/Hedear';
import ConfirmOrder from '../DetalleDelpagoCabezera/ConfirmOrder';
import PaymentMethodSelector from '../selectordepago/PaymentMethodSelector';
import ModernCountdownTimer from '../Timer/ModernCountdownTimer';

// Contenedor global que ocupará toda la página
const GlobalContainer = styled.div`
  min-height: 100vh;
  background-color: #1c1c1c;
  color: white;
  overflow-x: hidden;
`;

// Contenedor principal de la página de pago
const PaymentPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 98%;
`;

// Estilos para el título principal
const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: #28a745;
`;

// Estilos para el botón de pago
const PaymentButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const PaymentHomePage = () => {
  return (
    <GlobalContainer>
      <PaymentPageContainer>
        <Header/>
        <ConfirmOrder/>
        <PaymentMethodSelector/>
      </PaymentPageContainer>
    </GlobalContainer>
  );
};

export default PaymentHomePage;