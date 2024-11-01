import React, { useState } from 'react';
import styled from 'styled-components';
import Createsvg from './Createimgmapa';

// Estilos para el contenedor principal del encabezado
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  background-color: #2c3e50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

// Estilos para el contenedor del botón alineado a la izquierda
const LeftButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  flex: 1;
`;
const ModalContent = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 8px;
  max-width: ${(props) => props.maxWidth || '300px'};
  width: 100%;
  max-height: ${(props) => props.maxHeight || '200px'};
  overflow: hidden;
  position: relative;
  z-index: 1000;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// Estilos para el botón
const Button = styled.button`
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3498db;
  }
`;


// Componente reutilizable con el botón para agregar SVG
const HeaderWithButton = () => {
    const [isModalOpen ,setIsModalOpen]=useState(false);

    const handleOpenCreateimgmapa = () => {
        setIsModalOpen(true);
      };
      const handleCloseModal= ()=>{
        setIsModalOpen(false);
      }
  return (
    <HeaderContainer>
      <LeftButtonContainer>
        <Button onClick={handleOpenCreateimgmapa}>Agregar Svg</Button>       
      </LeftButtonContainer>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent maxHeight="200px">
            <Createsvg onClose={handleCloseModal} />
          </ModalContent>
        </ModalOverlay>
      )}
    </HeaderContainer>
  );
};

export default HeaderWithButton;
