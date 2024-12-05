import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiAlertCircle, FiDollarSign, FiUser, FiMail, FiPhone, FiCreditCard } from 'react-icons/fi';
import { createTransacionBancolombia } from '../../../api/TaskBancolombia';
import { usuariomostrarporid } from '../../../api/Taskusuario';
import { useidusuariodetallepago } from '../../../useUserStore';
import { detallesumbancolombia } from '../../../api/Taskdetalle';
import { useNavigate, useLocation, replace } from 'react-router-dom';
// Styled Components para Formulario y Recibo
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 20px;
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: white;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AmountContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const AmountLabel = styled.div`
  color: #ff3366;
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0;
  text-shadow: 0 0 10px rgba(255, 51, 102, 0.3);
`;

const Timer = styled.div`
  font-size: 2rem;
  color: ${props => props.isExpiring ? '#ff3366' : 'white'};
  text-align: center;
  margin: 1.5rem 0;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: color 0.3s ease;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #ff3366, #ff5555);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 51, 102, 0.3);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(45deg, #666666, #888888);
    box-shadow: none;
  }
`;

const Label = styled.div`
  color: #ff9999;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatusBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  margin: 1rem 0;
  background: ${props => {
    switch (props.status) {
      case 'PENDING':
        return 'rgba(255, 193, 7, 0.2)';
      case 'APPROVED':
        return 'rgba(76, 175, 80, 0.2)';
      case 'DECLINED':
        return 'rgba(244, 67, 54, 0.2)';
      default:
        return 'rgba(158, 158, 158, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING':
        return '#ffc107';
      case 'APPROVED':
        return '#4caf50';
      case 'DECLINED':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  }};
`;

const Section = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: white;
  font-weight: 500;
`;

const BackButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #ff3366;
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem;
  background: rgba(255, 51, 102, 0.1);
  border-radius: 8px;
`;

// Componente de Recibo
const TransactionReceipt = ({ transactionData, customerData,monto }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Fecha no disponible";
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', dateString);
        return "Fecha no válida";
      }

      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return "Error en formato de fecha";
    }
  };
const btnvolver = ()=>{
  window.scrollTo(0, 0);
  navigate('/',{replace:true});
}
  const formatCurrency = (amount) => {
    try {
      if (!amount || typeof amount.value === 'undefined') {
        return "Monto no disponible";
      }
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount.value);
    } catch (error) {
      console.error('Error al formatear monto:', error);
      return "Error en formato de monto";
    }
  };

  if (!transactionData || !customerData) {
    return (
      <Container>
        <Card>
          <ErrorMessage>
            <FiAlertCircle size={24} />
            <p>No se pudieron cargar los datos de la transacción</p>
          </ErrorMessage>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Comprobante de Pago</Title>

        <StatusBadge status={transactionData.status}>
          {transactionData.status === 'PENDING' && <FiClock />}
          {transactionData.status === 'APPROVED' && <FiCheckCircle />}
          {transactionData.status === 'DECLINED' && <FiAlertCircle />}
          {transactionData.statusMessage}
        </StatusBadge>

        <Section>
        <InfoItem>
  <InfoLabel>Monto Total</InfoLabel>
  <AmountLabel>
  $ {monto.toLocaleString('es-ES', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
  </AmountLabel>
</InfoItem>
        </Section>

        <Section>
          <Label>Información del Cliente</Label>
          <Grid>
            <InfoItem>
              <InfoLabel>Nombre</InfoLabel>
              <InfoValue>{customerData.full_name}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Documento</InfoLabel>
              <InfoValue>{customerData.legal_id} ({customerData.legal_id_type})</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{customerData.customer_email}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Teléfono</InfoLabel>
              <InfoValue>{customerData.phone_number}</InfoValue>
            </InfoItem>
          </Grid>
        </Section>

        <Section>
          <Label>Detalles de la Transacción</Label>
          <Grid>
            <InfoItem>
              <InfoLabel>Fecha</InfoLabel>
              <InfoValue>{formatDate(transactionData.message.createdAt)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Referencia</InfoLabel>
              <InfoValue>{transactionData.message.reference}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>ID de Transacción</InfoLabel>
              <InfoValue>{transactionData.message.id}</InfoValue>
            </InfoItem>
          </Grid>

          <ButtonGroup>
          <BackButton
          onDoubleClick={btnvolver}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
             Volver al inicio
          </BackButton>
        </ButtonGroup>
        </Section>
      </Card>
    </Container>
  );
};

// Componente Principal
const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const { idusuariodetallepago } = useidusuariodetallepago();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await detallesumbancolombia({ id: idusuariodetallepago });
        if (response?.data?.message) {
          setTotal(response.data.message);
        } else {
          throw new Error('Respuesta inválida al obtener detalles');
        }
      } catch (error) {
        console.error('Error al cargar detalles:', error);
        setError('Error al cargar los detalles del pago');
      }
    };
    fetchData();
  }, [idusuariodetallepago]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userResponse = await usuariomostrarporid({ id: idusuariodetallepago });
      
      if (!userResponse?.data?.data?.nombre) {
        throw new Error('Datos de usuario no disponibles');
      }

      const customerInfo = {
        id: idusuariodetallepago,
        customer_email: userResponse.data.data.correo,
        full_name: userResponse.data.data.NombreApellido,
        phone_number: userResponse.data.data.Numero,
        legal_id: userResponse.data.data.identificacion,
        legal_id_type: 'CC',
        redirect_url: 'https://tutienda.com/confirmacion'
      };

      const transactionResponse = await createTransacionBancolombia(customerInfo);
      
      if (!transactionResponse?.data) {
        throw new Error('Error al crear la transacción');
      }
console.log(transactionResponse.data);
      setTransactionData(transactionResponse.data);
      setCustomerData(customerInfo);
      
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {transactionData && customerData ? (
        <TransactionReceipt 
          transactionData={transactionData}
          customerData={customerData}
          monto={total}          
        />
      ) : (
        <Container>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>Pago en Corresponsal Bancolombia</Title>
            
            <form onSubmit={handlePayment}>
              <AmountContainer>
                <Label>Monto</Label>
                <AmountLabel>
                  ${total.toLocaleString('es-ES', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </AmountLabel>
              </AmountContainer>

              {error && (
                <ErrorMessage>{error}</ErrorMessage>
              )}

              <Timer isExpiring={timeLeft <= 60}>
                {formatTime(timeLeft)}
              </Timer>
              
              <Button
                type="submit"
                disabled={loading || timeLeft === 0}
                whileHover={{ scale: timeLeft > 0 ? 1.02 : 1 }}
                whileTap={{ scale: timeLeft > 0 ? 0.98 : 1 }}
              >
                {loading ? 'Procesando...' : 
                 timeLeft === 0 ? 'Tiempo expirado' : 'Generar pago'}
              </Button>
            </form>
          </Card>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default PaymentForm;