import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Building2, Shield, Check, ChevronRight, Star } from 'lucide-react';
import {  detalleEditarEstadoComprado, detallemostrarid_detalleAocupar } from '../../../api/Taskdetalle';
import { useStoreEncryp } from '../../../useUserStore';
import { palcoeditarocupadoTask } from '../../../api/Taskpalco';


const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #1e1e1e;
  padding: 3rem 1.5rem;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
    animation: ${float} 15s infinite ease-in-out;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;
// En el styled component que usa background-clip
const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #6366f1 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; // Respaldo para navegadores que no soportan -webkit-text-fill-color
  margin-bottom: 1rem;
  letter-spacing: -1px;
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PaymentCard = styled.div`
  position: relative;
  padding: 2rem;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.selected ? '#2a2a2a' : '#242424'};
  border: 1px solid ${props => props.selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'};
  transform-style: preserve-3d;
  transform: ${props => props.selected ? 'scale(1.02) translateY(-10px)' : 'scale(1)'};
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    padding: 1px;
    background: ${props => {
      switch(props.methodId) {
        case 'instant': return 'linear-gradient(135deg, #34d399 0%, transparent 50%)';
        case 'card': return 'linear-gradient(135deg, #6366f1 0%, transparent 50%)';
        case 'cash': return 'linear-gradient(135deg, #f97316 0%, transparent 50%)';
        case 'financing': return 'linear-gradient(135deg, #a855f7 0%, transparent 50%)';
        default: return 'transparent';
      }
    }};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${props => props.selected ? 1 : 0};
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: scale(1.02) translateY(-5px);
    background: #2a2a2a;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.methodId) {
      case 'instant': return 'rgba(52, 211, 153, 0.1)';
      case 'card': return 'rgba(99, 102, 241, 0.1)';
      case 'cash': return 'rgba(249, 115, 22, 0.1)';
      case 'financing': return 'rgba(168, 85, 247, 0.1)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.methodId) {
      case 'instant': return '#34d399';
      case 'card': return '#6366f1';
      case 'cash': return '#f97316';
      case 'financing': return '#a855f7';
      default: return '#fff';
    }
  }};
  border-radius: 20px;
  margin-bottom: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: ${props => {
      switch(props.methodId) {
        case 'instant': return 'linear-gradient(135deg, #34d399, transparent)';
        case 'card': return 'linear-gradient(135deg, #6366f1, transparent)';
        case 'cash': return 'linear-gradient(135deg, #f97316, transparent)';
        case 'financing': return 'linear-gradient(135deg, #a855f7, transparent)';
        default: return 'transparent';
      }
    }};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const PaymentTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Badge = styled.span`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #34d399;
  background: rgba(52, 211, 153, 0.1);
  border-radius: 30px;
  border: 1px solid rgba(52, 211, 153, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Features = styled.div`
  display: grid;
  gap: 1rem;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? 0 : '10px'});
  transition: all 0.3s ease;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  svg {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  border: none;
  border-radius: 16px;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: ${props => props.active ? 'pointer' : 'not-allowed'};
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #6366f1, #4f46e5)' 
    : '#2a2a2a'};
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  margin: 2rem auto 0;
  background: #2a2a2a;
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2f2f2f;
    transform: translateY(-2px);
  }

  svg {
    transform: rotate(180deg);
  }
`;

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const paymentMethods = [
    {
      id: 'instant',
      title: 'Pago Instantáneo',
      icon: <Building2 size={28} />,
      badge: 'Recomendado',
      features: [
        { icon: <Check size={16} />, text: 'Confirmación inmediata' },
        { icon: <Shield size={16} />, text: 'Máxima seguridad' },
        { icon: <Star size={16} />, text: '0% comisión' },
        { icon: <ChevronRight size={16} />, text: 'Compatible con todos los bancos' }
      ]
    },
    {
      id: 'card',
      title: 'Tarjeta de Crédito',
      icon: <CreditCard size={28} />,
      features: [
        { icon: <Check size={16} />, text: 'Todas las tarjetas' },
        { icon: <Shield size={16} />, text: 'Protección antifraude' },
        { icon: <Star size={16} />, text: 'MSI disponibles' },
        { icon: <ChevronRight size={16} />, text: 'Cargo inmediato' }
      ]
    },
    {
      id: 'cash',
      title: 'Pago en Efectivo',
      icon: <Wallet size={28} />,
      features: [
        { icon: <Check size={16} />, text: 'Sin cuenta bancaria' },
        { icon: <Shield size={16} />, text: 'Múltiples ubicaciones' },
        { icon: <Star size={16} />, text: 'Hasta 48hrs para pagar' },
        { icon: <ChevronRight size={16} />, text: 'Comprobante físico' }
      ]
    },
    {
      id: 'financing',
      title: 'Addi',
      icon: <Wallet size={28} />,
      features: [
        { icon: <Check size={16} />, text: 'Pago a cuotas' },
        { icon: <Star size={16} />, text: 'Aprobación inmediata' },
        { icon: <ChevronRight size={16} />, text: 'Comprobante físico' }
      ]
    }
  ];
  const btnefectuarpago = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      const response = await detallemostrarid_detalleAocupar({id:encryptedId})
      const detalles = response.data;
      console.log(detalles);
      if (!detalles || detalles.length === 0) {
        setIsProcessing(false);
        return;
      }
  
      for (const detalle of detalles) {
        try {
          const data = {
            id: detalle.id_detalle,
            cantidad: detalle.cant,
            id_usuario: encryptedId,
          }
          const response = await palcoeditarocupadoTask(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  const respo= await detalleEditarEstadoComprado({id:encryptedId});
const info =respo.data;
if (info.message==='correctamente') {
  alert('Bien');
}
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  }
  return (
    <Container>
      <Wrapper>
        <HeaderSection>
          <Title>Metodos de pago</Title>
        </HeaderSection>

        <PaymentGrid>
          {paymentMethods.map(method => (
            <PaymentCard
              key={method.id}
              methodId={method.id}
              selected={selectedMethod === method.id}
              onClick={() => setSelectedMethod(method.id)}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
            >
              <IconWrapper methodId={method.id}>
                {method.icon}
              </IconWrapper>
              
              <PaymentTitle>
                {method.title}
                {method.badge && (
                  <Badge>
                    <Star size={12} />
                    {method.badge}
                  </Badge>
                )}
              </PaymentTitle>

              <Features visible={hoveredMethod === method.id || selectedMethod === method.id}>
                {method.features.map((feature, index) => (
                  <Feature key={index}>
                    {feature.icon}
                    {feature.text}
                  </Feature>
                ))}
              </Features>
            </PaymentCard>
          ))}
        </PaymentGrid>

        <ActionButton 
  active={selectedMethod !== '' && !isProcessing} 
  onClick={btnefectuarpago}
>
  {isProcessing ? 'Procesando...' : 'Finalizar Pago'}
</ActionButton>

        <BackButton onClick={() => { window.scrollTo(0, 0); navigate(-1); }}>
          <ChevronRight size={20} />
          Continuar comprando
        </BackButton>
      </Wrapper>
    </Container>
  );
};

export default PaymentMethodSelector;