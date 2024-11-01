import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { X, Clock, MapPin, Replace } from 'lucide-react';
import { detalleeliminar, detalleMostrarInfo, detalletotalapagar } from '../../../api/Taskdetalle';
import { useStoreEncryp } from '../../../useUserStore';
import FloatingModernCountdownTimer from '../Timer/ModernCountdownTimer';
import ConfirmModal from '../../Messagedeconfirmacion/ConfirmModal';
import { useNavigate } from 'react-router-dom';
// Styled Components

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #13151a 0%, #2A2A72 100%);
  padding: 2rem;
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;
`;

const OrderCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start; /* Alinea elementos al inicio de la columna */
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Status = styled.span`
  color: #0CD1F9;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: rgba(12, 209, 249, 0.1);
  border-radius: 20px;
`;

const EventContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c; /* Rojo vibrante */
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #c0392b; /* Tonalidad más oscura para el hover */
    transform: scale(1.1); /* Efecto de zoom leve al hacer hover */
  }

  &:active {
    background: #e74c3c; /* Mantiene el color original al hacer clic */
    transform: scale(1); /* Regresa al tamaño original */
  }
`;


const EventDetails = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const EventTitle = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  gap: 0.5rem;
`;

const EventCode = styled.span`
  color: #0CD1F9;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(12, 209, 249, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: inline-block;
  margin-top: 0.5rem;
`;

const PriceSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const TotalRow = styled(PriceRow)`
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Quantity = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  text-align: right;
  display: block;
  margin-top: 0.5rem;
`;

const DiscountSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0CD1F9;
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const VerifyButton = styled.button`
  background: linear-gradient(135deg, #0CD1F9 0%, #0A8EE2 100%);
  border: none;
  border-radius: 12px;
  padding: 0 1.5rem;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 768px) {
    height: 50px;
  }
`;

const OrderConfirmation = () => {
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
const [events,setevents]=useState();
const [count,setcount]=useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const navigate = useNavigate();
  useEffect(()=>{

infomation();
  },[])
  const infomation= async ()=>{
    try {
      const info={
        id:encryptedId
      }
      mostravalorapagar(info);
      const response =  await detalleMostrarInfo(info);
      setevents(response.data);
    } catch (error) {
      console.log(error);
    }
    }
const mostravalorapagar=async (info)=>{
  try {
    const response = await detalletotalapagar(info);
    setcount(response.data);
  } catch (error) {
   
  }
}
const handleConfirm =async () => {
try {
  const response = await detalleeliminar({id:selectedId});
  if (response.data.message==='correctamente') {
    infomation();   
   if (response.data.remainingEvents===0) {
    navigate('/',{replace:true});
   }
  }
} catch (error) {
}
};

const handleDeleteClick = (id)=>{
  setIsModalOpen(true)
  setSelectedId(id);
}
  return (
    <Container>
      <OrderCard>
        <Header>
          <Title>Tu orden</Title>
          <Status>Confirmando</Status>
          <FloatingModernCountdownTimer/>
        </Header>
        {events && events.map((event) => (
        <React.Fragment key={event.id_detalle}>
          <EventContainer>
            <ImageContainer>
              <CloseButton onClick={() => handleDeleteClick(event.id_detalle)}>
                <X size={16} color="white" />
              </CloseButton>
              <img 
          src={event.img}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Asegúrate de que la imagen se ajuste bien al contenedor
        />
            </ImageContainer>

            <EventDetails>
              <EventTitle >{event.nombre}</EventTitle>
              <DetailRow>
                <MapPin size={16} />
                {event.Ubicacion}
              </DetailRow>
              <DetailRow>
                <Clock size={16} />
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
                <span>Total</span>
              <div>
              COP ${count && count.Total ? count.Total.toLocaleString() : "0"}
                <Quantity>Cantidad: #{count.count}</Quantity>
              </div>
            </TotalRow>

        <DiscountSection>
          <Input placeholder="Ingrese su código de descuento" />
          <VerifyButton>VERIFICAR</VerifyButton>
        </DiscountSection>
      </OrderCard>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        successMessage="¡Compra eliminada correctamente!"
        title="¿Eliminar compra?"
        message="¿Estás seguro de eliminar esta compra? No podrás recuperar esta información después."
      />
    </Container>
  );
};

export default OrderConfirmation;