import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { planomostrarporid_evento } from '../../../api/TaskEvento';

// Estilos para el contenedor del componente
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #1e1e1e;
  padding: 40px;
  border-radius: 20px;
  color: #1e1e1e;
  width: 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
`;

// Estilo para el texto "Plano" en la esquina superior izquierda con una línea debajo
const HeaderText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  position: relative;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: #ff0000;
  }
`;

// Contenedor para las imágenes subidas
const UploadedImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Una columna en pantallas grandes */
  gap: 20px;
  width: 100%;
  margin-top: 10px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas más grandes */
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
  }
`;

// Estilos para cada imagen
const UploadedImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  object-fit: contain;
`;

const Pplanosdelconcierto = ({ event }) => {
  const [imagenes, setImagenes] = useState([]);

  const imgmostrar = async () => {
    try {
      const response = await planomostrarporid_evento(event.id_eventos);
      setImagenes(response.data);
    } catch (error) {
      console.error("Error al cargar las imágenes", error);
    }
  };

  useEffect(() => {
    imgmostrar();
  }, []);

  return (
    <UploadContainer>
      <HeaderText>Plano</HeaderText> {/* Texto en la parte superior izquierda con una línea debajo */}
      <UploadedImageContainer>
        {imagenes.map((imagen) => (
          <UploadedImage key={imagen.id_plano} src={imagen.img} alt={imagen.nombre} />
        ))}
      </UploadedImageContainer>
    </UploadContainer>
  );
};

export default Pplanosdelconcierto;
