import React from 'react';
import styled,{createGlobalStyle } from 'styled-components';
import Carousel from '../carruseldeimg/CarouselItem';
import Header from '../encabezado/Hedear';
import SearchBar from '../optiondebusqueda/opciondebusqueda';
import TitleWithUnderline from '../subtitulos/subtitulosdeconcierto';
import Event from '../cartelesdeanuncio.jsx/carteldeanuncio';
import FooterContainer  from '../../piedepagina/piedepagina';

// Crear un styled-component llamado `PrincipalText`
const MainContainer = styled.div`
  background-color: #1c1c1c;
  width: 96%;
  max-width: 100vw; /* Limita el ancho máximo al tamaño de la ventana */
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  box-sizing: border-box; /* Asegura que padding y border estén dentro del ancho total */
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

const MainContainerPrincipal = styled.div`
  background-color: #1c1c1c;
  width: 100%;
  max-width: 100%; /* Limita el ancho máximo al tamaño de la ventana */
`;

// Componente funcional que renderiza el texto "Principal"
const PrincipalComponent = () => {
  return (
    <>
 <GlobalStyle /> 
  <MainContainer>
  <Header/>
  <Carousel/>
  <SearchBar/>
  <TitleWithUnderline/>
  <Event/>
  <FooterContainer/>
  </MainContainer>
  </>
  );
};

export default PrincipalComponent;
