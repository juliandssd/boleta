// Importa React y styled-components
import React from 'react';
import styled,{createGlobalStyle,keyframes} from 'styled-components';
import Header from '../../paginaprincipal/encabezado/Hedear';
import DataDelartista from '../Infodelartista/DatadelArtista';
import GridZoomComponent from '../Mapaclients/Mapacliens';
import TicketSelector from '../Detalledecompra/TicketSelectordetalle';
import PriceList from '../../Mapadelevento/CategoryPalco/Categoryinfopalco';

// Define un componente de estilo para el contenedor
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
`;
const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  html, body {
    height: 100%;
    background-color: #1c1c1c; /* Fondo gris oscuro */
  }

  @media (max-width: 768px) {
    body {
      background-color: #333; /* Fondo gris más claro para dispositivos móviles */
    }
  }
`;
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;
const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; // 
  animation: ${bounce} 1s ease-out;
  
  h1 {
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
  }
`;
const PriceAndSeatMapContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px; /* Ancho máximo opcional */
  padding: 0;
  margin: 20px auto; /* Centrado y margen superior */
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column-reverse; // Cambia a columna en pantallas pequeñas
    align-items: center; // Centra los elementos en columna
  }
`;



// Define el componente principal
const CarritocompraAPP = () => {
  return (
    <MainContainer>
 <GlobalStyle /> 
 <Header />

 <DataDelartista/>
 <PriceAndSeatMapContainer>

 <GridZoomComponent/>
 <PriceList/>
  </PriceAndSeatMapContainer>
 <TicketSelector/>
    </MainContainer>
  );
};

export default CarritocompraAPP;
