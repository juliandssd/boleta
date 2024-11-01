import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { eventomostrarPorUser } from '../../../api/TaskEvento';

// Estilos para la columna de eventos centrada
const EventColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
`;

// Estilos para cada tarjeta de evento con mejor distribución
const EventBox = styled.div`
  background-color: #1c1c1c;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  font-size: 14px;
  color: white;
  width: 90%;
  max-width: 350px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.5);
  }
`;

// Imagen del evento con un tamaño más pequeño y centrada
const EventImage = styled.img`
  width: 90%;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 18px;
  transition: transform 0.4s ease;

  ${EventBox}:hover & {
    transform: scale(1.05);
  }
`;

// Contenedor de la información del evento con mejor alineación
const EventDetails = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Roboto', sans-serif;
`;

// Información del evento
const EventName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #f7d117;
`;

const EventCity = styled.div`
  font-size: 14px;
  color: #cccccc;
`;

const EventCategory = styled.div`
  font-size: 13px;
  color: #bbbbbb;
`;

const EventDate = styled.div`
  font-size: 13px;
  color: #bbbbbb;
`;

// Botón con animaciones suaves
const EventLink = styled.a`
  background-color: #00aaff;
  color: white;
  padding: 10px 24px;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
  font-size: 15px;
  margin-top: 10px;
cursor: pointer;
  &:hover {
    background-color: #007acc;
    box-shadow: 0px 6px 12px rgba(0, 122, 204, 0.6);
  }
`;

const EventInfoList = ({ id_imgusuario, events, setEvents,onEventClick  }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await eventomostrarPorUser(id_imgusuario);
        setEvents(response.data); 
        // Usa el setter pasado como prop para actualizar el estado en el componente padre
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };
    fetchData();
  }, [id_imgusuario]); // Asegúrate de que el useEffect se ejecute cuando cambien estas dependencias

  return (
    <EventColumn>
      {events.map((event, index) => (
        <EventBox key={event.id_eventos}>
          <EventImage src={event.img} alt={event.nombre} />
          <EventDetails>
            <EventName>{event.nombre}</EventName>
            <EventCity>{event.ciudad}</EventCity>
            <EventCategory>{event.categoria}</EventCategory>
            <EventDate>Fecha: {new Date(event.fecha).toLocaleDateString()}</EventDate>
          </EventDetails>
          <EventLink onClick={() => onEventClick(event)}>Ver Evento</EventLink>
        </EventBox>
      ))}
    </EventColumn>
  );
};

export default EventInfoList;
