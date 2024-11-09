import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const breatheAnimation = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.02) rotate(0.5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const floatIn = keyframes`
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px;
  width: 100%;
  background: transparent;
  position: relative;
  box-sizing: border-box;
  gap: 40px;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 20px;
    width: 95%;
    margin: 0 auto;
  }
`;

const Section = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  flex: 1;
  min-width: 320px;
  backdrop-filter: blur(12px);
  transform-style: preserve-3d;
  animation: ${floatIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  border: 1px solid rgba(255, 107, 107, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, 
      rgba(255, 107, 107, 0.3), 
      rgba(255, 133, 133, 0.3),
      rgba(255, 107, 107, 0.3));
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateZ(20px);
    background: rgba(255, 255, 255, 0.15);
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    padding: 25px;
    margin: 0;
  }
`;

const DecorativeLine = styled.div`
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 107, 107, 0.3), 
    transparent);
  width: 100%;
  left: 0;
  
  ${props => props.top && css`
    top: 10px;
  `}
  
  ${props => props.bottom && css`
    bottom: 10px;
  `}
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: translateX(10px);
  }

  strong {
    color: #ff8585;
    font-weight: 600;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #ff8585;
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: right;
    }
    
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
    margin: 15px 0;
  }
`;

const TermsList = styled.ul`
  list-style-type: none;
  padding: 0;
  counter-reset: terms;
  perspective: 1000px;
`;

const TermItem = styled.li`
  margin-bottom: 25px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  padding: 20px 25px;
  background: rgba(255, 107, 107, 0.05);
  border-radius: 15px;
  border-left: 4px solid rgba(255, 107, 107, 0.5);
  transition: all 0.4s ease;
  position: relative;
  counter-increment: terms;
  transform-style: preserve-3d;
  backdrop-filter: blur(5px);
  
  &::before {
    content: counter(terms, decimal-leading-zero);
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    color: #ff8585;
    font-size: 12px;
    font-weight: 700;
    opacity: 0.7;
  }

  &:hover {
    transform: scale(1.02) translateX(10px) rotateY(2deg);
    background: rgba(255, 107, 107, 0.1);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.1);
  }

  &:nth-child(even) {
    border-left-color: rgba(255, 133, 133, 0.5);
    &:hover {
      transform: scale(1.02) translateX(10px) rotateY(-2deg);
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 15px;
    font-size: 14px;
    
    &::before {
      left: -20px;
      font-size: 10px;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.fontSize || '32px'};
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 40px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding-bottom: 15px;

  &::before {
    content: '${props => props.accent || ''}';
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12px;
    color: #ff8585;
    letter-spacing: 5px;
    font-weight: 400;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, rgba(255, 107, 107, 0.8), transparent);
  }

  @media (max-width: 768px) {
    font-size: ${props => props.fontSize ? '20px' : '24px'};
    margin-bottom: 30px;
    letter-spacing: 2px;

    &::before {
      font-size: 10px;
      top: -15px;
    }
  }
`;

const StyledLink = styled.a`
  display: inline-block;
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 15px 30px;
  margin-top: 30px;
  border: none;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 133, 133, 0.8));
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 133, 133, 0.8), rgba(255, 107, 107, 0.8));
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.2);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 14px;
    margin-top: 20px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  padding: 8px 15px;
  background: linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(255, 133, 133, 0.8));
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.2);
  animation: ${breatheAnimation} 3s infinite ease-in-out;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 10px;
    right: 10px;
    top: -8px;
  }
`;

const TermsAndConditions = () => {
  return (
    <Container>
      <Section delay="0s">
        <Badge>Seguridad</Badge>
        <DecorativeLine top />
        <SectionTitle fontSize="24px" accent="IMPORTANTE">
          Precauciones de Compra
        </SectionTitle>
        <InfoText>
          Para evitar ser estafado, nosotros no tenemos vendedores y/o promotores externos, tu seguridad y tranquilidad es importante para nosotros, por esta razón solamente podemos responder por las entradas adquiridas en nuestros puntos de venta oficiales.
        </InfoText>
        <InfoText>
          <strong>LaTiquetera es el único operador de boletería autorizado.</strong>
        </InfoText>
        <DecorativeLine bottom />
      </Section>

      <Section delay="0.2s">
        <Badge>Oficial</Badge>
        <DecorativeLine top />
        <SectionTitle accent="LEGAL">TÉRMINOS Y CONDICIONES</SectionTitle>
        <TermsList>
          {[
            "Las entradas podrán ser reclamadas únicamente por la persona que figura en la tarjeta de crédito o débito utilizada para la compra.",
            "Deberá presentar la tarjeta de crédito original (no se aceptan fotocopias de las tarjetas); en caso de usar una tarjeta de crédito virtual, se debe presentar un documento emitido por el banco.",
            "Deberá presentar el documento de identidad en original y también deberá entregar una fotocopia de la cédula por las dos caras.",
            "El valor de la entrada publicado ya incluye el precio del servicio que varía dependiendo de la localidad.",
            "La entrega es personal e intransferible, solo se entregará al titular de la tarjeta de crédito o débito.",
            "Debe presentar el documento de identidad en original del titular de la tarjeta de crédito.",
            "Una vez adquirida su entrada y finalizada la compra, no hay reintegros de dinero.",
            "Los descuentos no son acumulables y no aplican sobre el servicio de La Tiquetera."
          ].map((text, index) => (
            <TermItem key={index}>{text}</TermItem>
          ))}
        </TermsList>
        <StyledLink href="#">
          Ver términos completos
        </StyledLink>
        <DecorativeLine bottom />
      </Section>
    </Container>
  );
};

export default TermsAndConditions;