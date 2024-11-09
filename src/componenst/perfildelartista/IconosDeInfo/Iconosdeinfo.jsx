import React from 'react';
import styled from 'styled-components';
import { MapPin, Calendar, Clock, DoorOpen, User } from 'lucide-react';

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 15px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  color: #ffffff;
  height: 120px; // Aumentado para dar más espacio
  padding: 8px 4px;

  @media (max-width: 768px) {
    height: 110px;
  }
`;

const StyledLucideIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin-bottom: 6px;
  
  svg {
    width: 28px;
    height: 28px;
    color: #ff0000;
  }
`;

const InfoText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin: 4px 0 8px 0; // Aumentado margin-bottom
  min-height: 40px; // Altura fija para dos líneas de texto
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  line-height: 1.2;
  padding: 0 4px;

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 36px;
  }
`;

const SubText = styled.div`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  width: 100%;
  padding: 4px;
  min-height: 24px; // Altura mínima para el texto
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const IconosDeInfo = ({ event }) => {
  const infoItems = [
    { icon: MapPin, label: 'Lugar', value: event.ubicaciondelevento },
    { icon: Calendar, label: 'Fecha', value: event.fecha },
    { icon: Clock, label: 'Hora', value: event.hora },
    { icon: DoorOpen, label: 'Apertura de\npuertas', value: event.horadeapertura }, // Texto en dos líneas
    { icon: User, label: 'Edad mínima', value: event.edadminima }
  ];

  return (
    <InfoContainer>
      {infoItems.map(({ icon: Icon, label, value }) => (
        <InfoItem key={label}>
          <StyledLucideIcon>
            <Icon />
          </StyledLucideIcon>
          <InfoText>{label}</InfoText>
          <SubText>{value}</SubText>
        </InfoItem>
      ))}
    </InfoContainer>
  );
};

export default IconosDeInfo;