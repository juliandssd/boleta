import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDataevento } from '../../../useUserStore';

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
    margin-top: 80px;
    width: 90%;
    padding: 10px;
  }
`;

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
    max-width: 80%;
  }
`;



const EventTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #f7f7f7;
  margin-bottom: 10px;
  width: 100%;
`;

const EventDetails = styled.div`
  display: flex;
  background-color: #333;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  padding: 15px;
  width: 100%;

  .date {
    font-size: 18px;
    color: white;
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


const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center; // Centra el botón en móvil
    padding: 20px 15px; // Aumenta el padding vertical para mejor espaciado
  }

  .buyButton {
    position: relative;
    padding: 12px 35px;
    background: #ff0000;
    border: none;
    outline: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #fff;
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 1;
    width: auto; // Permite que el botón mantenga su ancho natural

    @media (max-width: 768px) {
      padding: 12px 40px; // Aumenta el padding horizontal en móvil
      font-size: 15px; // Ajusta el tamaño de fuente para móvil
      min-width: 200px; // Asegura un ancho mínimo en móvil
      text-align: center; // Centra el texto
    }

    &:before, &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      transition: all 0.5s ease;
      background: linear-gradient(45deg, #ff0000, #ff4444, #ff0000);
      background-size: 200% 200%;
    }

    &:after {
      opacity: 0;
      background: linear-gradient(45deg, #ff4444, #ff0000, #ff4444);
      background-size: 200% 200%;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3),
                  0 10px 30px rgba(255, 0, 0, 0.2);

      &:before {
        opacity: 0;
      }

      &:after {
        opacity: 1;
        animation: gradient 2s ease infinite;
      }
    }

    &:active {
      transform: translateY(-1px);
      box-shadow: 0 2px 10px rgba(255, 0, 0, 0.2);
    }

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;

const EventInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  @media (min-width: 769px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Pcabezeraartista = ({ event }) => {
  const navigate = useNavigate();
  const { setdataevento } = useDataevento();

  const handlecomprar = () => {
    window.scrollTo(0, 0);
    setdataevento(event);
    navigate('/carrito/de/compra');
  };

  return (
    <Container>
      <EventContainer>
        <ImageContainer>
          <img src={event.img} alt="Event" />
        </ImageContainer>
        
        <EventInfo>
          <EventTitle>{event.nombre}</EventTitle>
          <EventDetails>
            <div className="date">{event.fecha}</div>
            <div className="city">{event.ciudad}</div>
            <div className="location">{event.ubicaciondelevento}</div>
          </EventDetails>
          <PurchaseInfo>
            <button className="buyButton" onClick={handlecomprar}>
              Comprar
            </button>
          </PurchaseInfo>
        </EventInfo>
      </EventContainer>
    </Container>
  );
};

export default Pcabezeraartista;