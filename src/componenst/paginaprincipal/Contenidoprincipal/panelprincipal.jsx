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
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 96%;
    margin: 0 auto;
  }
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
  max-width: 100%;

  @media (max-width: 768px) {
    width: 96%;
    margin: 0 auto;
  }
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
