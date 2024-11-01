import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faFileAlt, faKey } from '@fortawesome/free-solid-svg-icons';

// Contenedor principal centrado
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  min-height: 100%;
  padding: 20px;
`;

// Contenedor de la información con fondo oscuro
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background-color: #1e1e1e;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;

// Contenedor de cada ítem
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

// Contenedor del texto
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilo para el texto principal
const InfoText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4px;
`;

// Estilo para el subtexto
const SubText = styled.div`
  font-size: 14px;
  color: #cccccc;
`;

// Estilo personalizado para el ícono
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: #ff0000; // Color rojo para los íconos
`;

const DATAdelempresario = ({ event }) => {
  const [responsable, setResponsable] = useState(event.responsable);
  const [nit, setNit] = useState(event.nit);
  const [pulep, setPulep] = useState(event.Pulep);

  useEffect(() => {
    console.log(event);
  }, []);

  return (
    <MainWrapper>
      <InfoContainer>
        <InfoItem>
          <StyledIcon icon={faBriefcase} />
          <TextContainer>
            <InfoText>Responsable:</InfoText>
            <SubText>{responsable}</SubText>
          </TextContainer>
        </InfoItem>

        <InfoItem>
          <StyledIcon icon={faFileAlt} />
          <TextContainer>
            <InfoText>Nit:</InfoText>
            <SubText>{nit}</SubText>
          </TextContainer>
        </InfoItem>

        <InfoItem>
          <StyledIcon icon={faKey} />
          <TextContainer>
            <InfoText>Pulep:</InfoText>
            <SubText>{pulep}</SubText>
          </TextContainer>
        </InfoItem>
      </InfoContainer>
    </MainWrapper>
  );
};

export default DATAdelempresario;