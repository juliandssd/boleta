import React from 'react';
import styled from 'styled-components';

// Estilos con styled-components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px;
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
    width: 95vw; /* Ocupa todo el ancho de la ventana en dispositivos móviles */
    margin: 0; /* Elimina márgenes para ajustar mejor al ancho completo */
    border-radius: 0; /* Opcional: elimina el borde redondeado */
  }
`;

const Section = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  margin: 10px;
  flex: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  color: #f1f1f1;
  text-align: left;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #ccc;
`;

const TermsList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const TermItem = styled.li`
  margin-bottom: 10px;
  font-size: 16px;
  color: #b3b3b3;
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.fontSize || '24px'};
  font-weight: bold;
  position: relative;
  color: white;
  margin-bottom: 20px;
  text-align: left;

  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    background-color: #ff0000;
    bottom: -10px;
    left: 0;
  }
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    color: #ff0000;
  }
`;

const TermsAndConditions = () => {
  return (
    <Container>
      <Section>
        <SectionTitle fontSize="20px">Precauciones para Evitar Estafas en la Compra de Entradas</SectionTitle>
        <InfoText>
          Para evitar ser estafado, nosotros no tenemos vendedores y/o promotores externos, tu seguridad y tranquilidad es importante para nosotros, por esta razón solamente podemos responder por las entradas adquiridas en nuestros puntos de venta oficiales, recuerda que la originalidad de las entradas solamente serán verificadas en la entrada del evento.
        </InfoText>
        <InfoText><strong>LaTiquetera es el único operador de boletería autorizado.</strong></InfoText>
      </Section>

      <Section>
        <SectionTitle>TÉRMINOS Y CONDICIONES</SectionTitle>
        <TermsList>
          <TermItem>Las entradas podrán ser reclamadas únicamente por la persona que figura en la tarjeta de crédito o débito utilizada para la compra.</TermItem>
          <TermItem>Deberá presentar la tarjeta de crédito original (no se aceptan fotocopias de las tarjetas); en caso de usar una tarjeta de crédito virtual, se debe presentar un documento emitido por el banco en el cual conste la relación de tarjeta habiente.</TermItem>
          <TermItem>Deberá presentar el documento de identidad en original y también deberá entregar una fotocopia de la cédula por las dos caras.</TermItem>
          <TermItem>El valor de la entrada publicado ya incluye el precio del servicio que varía dependiendo de la localidad.</TermItem>
          <TermItem>La entrega es personal e intransferible, solo se entregará al titular de la tarjeta de crédito o débito.</TermItem>
          <TermItem>Debe presentar el documento de identidad en original del titular de la tarjeta de crédito.</TermItem>
          <TermItem>Una vez adquirida su entrada y finalizada la compra, no hay reintegros de dinero.</TermItem>
          <TermItem>Los descuentos no son acumulables y no aplican sobre el servicio de La Tiquetera.</TermItem>
        </TermsList>
        <InfoText>
          <StyledLink href="#">
            Ver los términos y condiciones completos
          </StyledLink>
        </InfoText>
      </Section>
    </Container>
  );
};

export default TermsAndConditions;
