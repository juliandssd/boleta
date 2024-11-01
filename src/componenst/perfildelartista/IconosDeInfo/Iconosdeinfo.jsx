import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapPin, Calendar, Clock, DoorOpen, User, Edit } from 'lucide-react';

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 10px;
  width: 90%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  margin: 0 10px;

  .icon {
    font-size: 24px;
    color: #ff0000;
  }

  .label {
    font-weight: bold;
    margin-top: 5px;
    font-size: 14px;
  }

  .value {
    color: white;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .icon {
      font-size: 32px;
    }
    .label, .value {
      font-size: 16px;
    }
    margin-bottom: 15px;
  }
`;

const StyledLucideIcon = styled.div`
  svg {
    width: 28px;
    height: 28px;
    margin-bottom: 10px;
    color: #ff0000;
  }
  @media (max-width: 768px) {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const InfoText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
  text-align: center;
`;

const SubText = styled.div`
  font-size: 16px;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const IconosDeInfo = ({ event }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const iconSize = screenWidth <= 768 ? 32 : 28;

  return (
    <InfoContainer>
      <InfoItem>
        <StyledLucideIcon>
          <MapPin size={iconSize} />
        </StyledLucideIcon>
        <InfoText>Lugar</InfoText>
        <SubText>{event.ubicaciondelevento}</SubText>
      </InfoItem>

      <InfoItem>
        <StyledLucideIcon>
          <Calendar size={iconSize} />
        </StyledLucideIcon>
        <InfoText>Fecha</InfoText>
        <SubText>{event.fecha}</SubText>
      </InfoItem>

      <InfoItem>
        <StyledLucideIcon>
          <Clock size={iconSize} />
        </StyledLucideIcon>
        <InfoText>Hora</InfoText>
        <SubText>{event.hora}</SubText>
      </InfoItem>

      <InfoItem>
        <StyledLucideIcon>
          <DoorOpen size={iconSize} />
        </StyledLucideIcon>
        <InfoText>Apertura de puertas</InfoText>
        <SubText>{event.horadeapertura}</SubText>
      </InfoItem>

      <InfoItem>
        <StyledLucideIcon>
          <User size={iconSize} />
        </StyledLucideIcon>
        <InfoText>Edad mínima</InfoText>
        <SubText>{event.edadminima}</SubText>
      </InfoItem>
    </InfoContainer>
  );
};

export default IconosDeInfo;