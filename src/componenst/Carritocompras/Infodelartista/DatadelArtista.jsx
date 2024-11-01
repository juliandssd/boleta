import React, { useEffect, useState } from 'react';
import styled, { keyframes }  from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { eventsMostrarIdEvents, eventoeditarubicacion } from '../../../api/TaskEvento';
import { useNavigate } from 'react-router-dom';
import { useDataevento } from '../../../useUserStore';


// Contenedor principal que organiza la disposición
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
`;

const EventContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 70%;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 80px; /* Reducir el margen superior en pantallas pequeñas */
    width: 90%;
    padding: 10px; /* Reducir padding en dispositivos móviles */
  }
`;

// Contenedor de la imagen
const ImageContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    max-width: 80%; /* Limita el tamaño en dispositivos móviles */
  }
`;

// Contenedor de la información del evento
const EventInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

// Título del evento
const EventTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #f7f7f7;
  margin-bottom: 10px;
  width: 100%;
`;

// Detalles del evento
const EventDetails = styled.div`
  display: flex;
  background-color: #333;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  padding: 10px;
  width: 100%;

  .date {
    font-size: 18px;
    color: #00e6e6;
    font-weight: bold;
  }

  .city {
    font-size: 16px;
    color: white;
  }

  .location {
    font-size: 14px;
    color: #ccc;
  }
`;
const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    color: #00e6e6;
  }
  50% {
    transform: scale(1.1);
    color: #ff4b4b;
  }
`;
const PurchaseInfo = styled.div`
  display: flex;
  justify-content: flex-start; /* Alineación a la izquierda */
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;

  .buyButton {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
const AnimatedText = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  animation: ${pulseAnimation} 1.5s infinite;
  border-radius: 5px;
  color: #00e6e6;
  background-color: #333;
`;
const DataDelartista = () => {

  const navigate = useNavigate();
  const {dataevento}= useDataevento();
  const handlecomprar=()=>{
    navigate('/carrito/de/compra');
  }

  return (
    <Container>
      <EventContainer>
        <ImageContainer>
          <img src={dataevento.img} alt="Event" />
        </ImageContainer>
        
        <EventInfo>
          <EventTitle>{dataevento.nombre}</EventTitle>
          <EventDetails>
            <div className="date">{dataevento.fecha}</div>
            <div className="city">{dataevento.ciudad}</div>
            <div className="location">{dataevento.ubicaciondelevento}</div>
          </EventDetails>
          <PurchaseInfo>
            <AnimatedText>Super Oferta</AnimatedText>
          </PurchaseInfo>
        </EventInfo>
      </EventContainer>
    </Container>
  );
};

export default DataDelartista;
