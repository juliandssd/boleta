import React, { useEffect, useState,useRef  } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { eventopublicarpublicidadprincipal } from '../../../api/TaskEvento';
import { useConciertoStore } from '../../../useUserStore';
const fadeInBlur = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px); /* Comienza borroso */
  }
  100% {
    opacity: 1;
    filter: blur(0); /* Termina claro */
  }
`;

const EventCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 10px;
  width: 250px;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  font-family:Arial, Helvetica, sans-serif;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
  transform: translateY(30px); /* Posición inicial para animación */


  &:hover {
    transform: translateY(-5px);
    background-color: #333;
    box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.7);
  }
  @media (max-width: 768px) {
    width: 90%; /* Ancho ajustado en pantallas pequeñas */
    margin: 0 auto; /* Centramos la tarjeta */
    margin-right: 10px;
  }
`;
const CardWrapper = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 95%;
  @media (max-width: 768px) {
    justify-content: center; /* Centra las tarjetas en dispositivos móviles */
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

const Day = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #00c6ff;
  line-height: 1;
  text-align: center;
`;

const DateDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #b5b5b5;
  text-transform: uppercase;
`;

const Location = styled.div`
  font-size: 14px;
  color: #e0e0e0;
  text-align: center;
  margin: 10px 0;
`;

const City = styled.div`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin: 5px 0;
  font-weight: bold;
`;

const BuyButton = styled.a`
  background-color: #ff4500;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ff6347;
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #888;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.6);

  img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    object-fit: cover;
   
  }
  @media (max-width: 768px) {
    height: 290px;
    border-radius: 10px;
    background-color:transparent; /* Ajusta la altura de la imagen en pantallas móviles */
  }
`;

const Label = styled.div`
  background-color: #ff5722;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 12px;
  position: absolute;
  top: 8px;
  left: 8px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 1);
  transform: rotate(-10deg);
`;

const Event = () => {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const cardsRef = useRef([]); 
  const {setConciertoId}= useConciertoStore();
  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await eventopublicarpublicidadprincipal();
        setInfo(response.data);
      } catch (error) {
      }
    };

    fetchInformation();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            card.classList.add('visible');
          } else {
            card.classList.remove('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
const handleCompra= (id)=>{
  setConciertoId(id);
  window.scrollTo(0, 0); 
  navigate('evento/hola'); 
}
  return (
    <CardWrapper>
      {info.map((evento, index) => (
        <EventCard key={evento.id_eventos}
          ref={(el) => (cardsRef.current[index] = el)}
        >
          <ImageContainer>
            <Label>{evento.Diass}</Label>
            <img src={evento.img} alt={evento.nombre} />
          </ImageContainer>
          <Title>{evento.nombre}</Title>
          <DateContainer>
            <Day>{evento.dia}</Day> {/* Puedes personalizar la fecha */}
            <DateDetails>
              <span>{evento.mes}</span>
              <span>{evento.dia_letra}</span>
            </DateDetails>
          </DateContainer>
          <City>{evento.ciudad}</City> {/* Nueva sección para la ciudad */}
          <Location>{evento.ubicaciondelevento}</Location>
          <BuyButton onClick={()=>handleCompra(evento.id_eventos)}>Comprar Entrada</BuyButton>
        </EventCard>
      ))}
    </CardWrapper>
  );
};

export default Event;
