import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../../paginaprincipal/encabezado/Hedear';
import ConfirmOrder from '../DetalleDelpagoCabezera/ConfirmOrder';
import PaymentMethodSelector from '../selectordepago/PaymentMethodSelector';
import ModernCountdownTimer from '../Timer/ModernCountdownTimer';

// Estilos globales
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    background-color: #1c1c1c;
  }

  @media (max-width: 768px) {
    body {
      background-color: #333;
    }
  }
`;

// Contenedor principal
const MainContainer = styled.div`
  background-color: #1c1c1c;
  width: 100%;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
`;

// Contenedor del contenido de la página
const PaymentPageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PaymentHomePage = () => {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <PaymentPageContainer>
          <ContentWrapper>
            <Header />
            <ConfirmOrder />
            <PaymentMethodSelector />
          </ContentWrapper>
        </PaymentPageContainer>
      </MainContainer>
    </>
  );
};

export default PaymentHomePage;