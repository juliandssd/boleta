import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faFileAlt, faKey } from '@fortawesome/free-solid-svg-icons';

const subtleFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainWrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
  }
`;

const Card = styled.div`
  flex: 1;
  max-width: 350px;
  background: linear-gradient(145deg, #242424, #1c1c1c);
  border-radius: 20px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    20px 20px 60px #151515,
    -20px -20px 60px #292929;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  opacity: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,0,0,0.1), transparent);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      25px 25px 75px #151515,
      -25px -25px 75px #292929;
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: #2a2a2a;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  animation: ${subtleFloat} 3s ease-in-out infinite;
  box-shadow: inset 5px 5px 10px #1a1a1a,
              inset -5px -5px 10px #3a3a3a;

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(145deg, rgba(255,0,0,0.2), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, 
                  linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: #ff3333;
  opacity: 0.9;
  filter: drop-shadow(0 0 5px rgba(255,0,0,0.3));
`;

const ContentContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const Title = styled.h3`
  color: rgba(255,255,255,0.9);
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: rgba(255,0,0,0.3);
  }
`;

const Value = styled.div`
  color: rgba(255,255,255,0.7);
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  position: relative;
  padding: 10px 0;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: rgba(255,255,255,0.9);
  }
`;

const DATAdelempresario = ({ event }) => {
  const [responsable, setResponsable] = useState(event.responsable);
  const [nit, setNit] = useState(event.nit);
  const [pulep, setPulep] = useState(event.Pulep);

  return (
    <MainWrapper>
      <Container>
        <Card delay={0}>
          <IconContainer>
            <StyledIcon icon={faBriefcase} />
          </IconContainer>
          <ContentContainer>
            <Title>Responsable</Title>
            <Value>{responsable}</Value>
          </ContentContainer>
        </Card>

        <Card delay={0.2}>
          <IconContainer>
            <StyledIcon icon={faFileAlt} />
          </IconContainer>
          <ContentContainer>
            <Title>NIT</Title>
            <Value>{nit}</Value>
          </ContentContainer>
        </Card>

        <Card delay={0.4}>
          <IconContainer>
            <StyledIcon icon={faKey} />
          </IconContainer>
          <ContentContainer>
            <Title>PULEP</Title>
            <Value>{pulep}</Value>
          </ContentContainer>
        </Card>
      </Container>
    </MainWrapper>
  );
};

export default DATAdelempresario;