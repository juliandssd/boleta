import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, Clock, MapPin, Replace } from 'lucide-react';
import { detalleeliminar, detalleMostrarInfo, detalletotalapagar } from '../../../api/Taskdetalle';
import { useStoreEncryp } from '../../../useUserStore';
import FloatingModernCountdownTimer from '../Timer/ModernCountdownTimer';
import ConfirmModal from '../../Messagedeconfirmacion/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";

// Animaciones
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), 0 0 10px rgba(255, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.2); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.3), 0 0 30px rgba(255, 0, 0, 0.3); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), 0 0 10px rgba(255, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.2); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.5rem;
    width: 100%;
    margin-top: 90px;
  }
`;

const OrderCard = styled.div`
  width: 100%;
  max-width: 900px;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 40px;
  padding: 3rem;
  border: 1px solid rgba(255, 0, 0, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 100px rgba(255, 0, 0, 0.1),
    inset 0 0 20px rgba(255, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${glow} 4s infinite;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 20px;
    width: 99%;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -50px;
    right: -50px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 0, 0, 0.5),
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0.5),
      transparent
    );
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FF3333 0%, #FF0000 50%, #CC0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
  letter-spacing: -1px;
`;

const Status = styled.span`
  color: #FF3333;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.8rem 1.8rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 30px;
  border: 1px solid rgba(255, 0, 0, 0.3);
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.2),
    inset 0 0 10px rgba(255, 0, 0, 0.1);
  animation: ${glow} 2s infinite;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EventContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 30px;
  border: 1px solid rgba(255, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);



  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.3), transparent);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 0, 0, 0.2),
      transparent 60%
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.15);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: rgba(255, 0, 0, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);

  &:hover {
    transform: rotate(90deg) scale(1.2);
    background: #FF0000;
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
  }

  &:active {
    transform: rotate(90deg) scale(0.9);
  }
`;

const EventDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
`;

const EventTitle = styled.h3`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FFF 50%, #FF3333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.75rem;
  }
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  gap: 1rem;
  padding: 0.5rem 0;

  svg {
    color: #FF3333;
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.4));
  }
`;

const EventCode = styled.span`
  color: #FF3333;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(255, 0, 0, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 15px;
  display: inline-block;
  margin-top: 0.5rem;
  border: 1px solid rgba(255, 0, 0, 0.3);
  box-shadow: 
    0 5px 15px rgba(255, 0, 0, 0.2),
    inset 0 0 10px rgba(255, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 20px rgba(255, 0, 0, 0.3),
      inset 0 0 15px rgba(255, 0, 0, 0.2);
  }
`;

const PriceSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 0, 0, 0.1);
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 0, 0, 0.1);
  }
`;

const TotalRow = styled(PriceRow)`
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.1), transparent);
  border-radius: 20px;
  border: 1px solid rgba(255, 0, 0, 0.2);
  box-shadow: inset 0 0 20px rgba(255, 0, 0, 0.1);
`;

const Quantity = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: normal;
  display: block;
  margin-top: 0.5rem;
  text-align: right;
`;

const DiscountSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -1.5rem;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.3), transparent);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: 20px;
  padding: 1.2rem 1.8rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: rgba(255, 0, 0, 0.5);
    background: rgba(40, 40, 40, 0.9);
    box-shadow: 
      0 0 20px rgba(255, 0, 0, 0.2),
      inset 0 0 10px rgba(255, 0, 0, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const VerifyButton = styled.button`
  background: linear-gradient(135deg, #FF3333 0%, #CC0000 100%);
  border: none;
  border-radius: 20px;
  padding: 0 2.5rem;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 180px;
  box-shadow: 
    0 10px 20px rgba(255, 0, 0, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 15px 25px rgba(255, 0, 0, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 5px 15px rgba(255, 0, 0, 0.2),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    height: 55px;
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0F0F0F 0%, #1E0505 100%);
  color: #fff;
  gap: 1.5rem;

  svg {
    color: #FF3333;
    filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
  }
`;

const OrderConfirmation = () => {
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const [events, setEvents] = useState();
  const [count, setCount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    infomation();
  }, []);

  const infomation = async () => {
    setLoading(true);
    try {
      const info = {
        id: encryptedId
      };
      mostravalorapagar(info);
      const response = await detalleMostrarInfo(info);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const mostravalorapagar = async (info) => {
    try {
      const response = await detalletotalapagar(info);
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await detalleeliminar({ id: selectedId });
      if (response.data.message === 'correctamente') {
        infomation();
        if (response.data.remainingEvents === 0) {
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (id) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loader2 className="h-14 w-14 animate-spin" />
        <p className="text-xl font-medium">Cargando tu experiencia...</p>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <OrderCard>
        <Header>
          <Title>Tu Orden</Title>
          <Status>Confirmando</Status>
          <FloatingModernCountdownTimer />
        </Header>

        {events && events.map((event) => (
          <React.Fragment key={event.id_detalle}>
            <EventContainer>
              <ImageContainer>
                <CloseButton onClick={() => handleDeleteClick(event.id_detalle)}>
                  <X size={16} color="white" />
                </CloseButton>
                <img src={event.img} alt={event.nombre} />
              </ImageContainer>

              <EventDetails>
                <EventTitle>{event.nombre}</EventTitle>
                <DetailRow>
                  <MapPin size={20} />
                  {event.Ubicacion}
                </DetailRow>
                <DetailRow>
                  <Clock size={20} />
                  {event.Fecha}
                </DetailRow>
                <EventCode>{event.Artista}</EventCode>
              </EventDetails>
            </EventContainer>

            <PriceSection>
              <PriceRow>
                <span>Entradas (x{event.Xpersona})</span>
                <span>COP ${event.precio.toLocaleString()}</span>
              </PriceRow>
            </PriceSection>
          </React.Fragment>
        ))}

        <TotalRow>
          <span>Total a Pagar</span>
          <div>
            <span>COP ${count && count.Total ? count.Total.toLocaleString() : "0"}</span>
            <Quantity>Cantidad: #{count.count}</Quantity>
          </div>
        </TotalRow>

        <DiscountSection>
          <Input placeholder="Ingresa tu código de descuento" />
          <VerifyButton>Verificar</VerifyButton>
        </DiscountSection>
      </OrderCard>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        successMessage="¡Compra eliminada exitosamente!"
        title="¿Eliminar Compra?"
        message="¿Estás seguro de que deseas eliminar esta compra? No podrás recuperar esta información después."
      />
    </Container>
  );
};

export default OrderConfirmation;
  