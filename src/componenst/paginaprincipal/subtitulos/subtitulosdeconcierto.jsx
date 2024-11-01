import React from 'react';
import styled from 'styled-components';

// Estilo para el contenedor del título alineado a la izquierda
const TitleContainer = styled.div`
  display: flex;
  font-family: 'Arial', sans-serif; 
  flex-direction: column;
  align-items: flex-start; /* Alinea el contenido a la izquierda */
  margin-bottom: 20px;
`;

// Estilo para el título
const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #f5f5f5;
  margin: 0;
  text-align: left; /* Asegura que el texto esté alineado a la izquierda */
`;

// Estilo para la línea debajo del título
const Underline = styled.div`
  width: 80px; /* Ajusta el ancho de la línea */
  height: 4px;
  background-color: #d90429; /* Color azul del subrayado */
  margin-top: 8px; /* Espacio entre el título y la línea */
`;

// Componente del Título
const TitleWithUnderline = () => {
  return (
    <TitleContainer>
      <Title>Conciertos</Title>
      <Underline />
    </TitleContainer>
  );
};

export default TitleWithUnderline;
