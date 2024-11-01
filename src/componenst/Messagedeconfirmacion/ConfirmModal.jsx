import styled, { keyframes } from 'styled-components';
import { AlertCircle, X, Loader, Check, XCircle } from 'lucide-react';
import { useState } from 'react';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  padding-bottom: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.5rem;
  border-radius: 50%;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Content = styled.div`
  padding: 0 1.25rem;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem;
  padding-top: 1rem;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: #e5e7eb;
  width: 100%;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.success ? '#22c55e' : '#2563eb'};
    transition: width 0.3s ease;
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 1.25rem;
`;

const LoadingIcon = styled(Loader)`
  animation: ${spin} 1s linear infinite;
  color: #2563eb;
`;

const StatusIcon = styled.div`
  color: ${props => props.success ? '#22c55e' : '#dc2626'};
  animation: ${fadeIn} 0.2s ease-out;
`;

const StatusText = styled.p`
  margin: 0;
  color: ${props => props.success ? '#15803d' : '#dc2626'};
  font-weight: 500;
`;

const ConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.disabled ? '#93c5fd' : '#2563eb'};
  color: white;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background-color: ${props => props.disabled ? '#93c5fd' : '#1d4ed8'};
    box-shadow: ${props => !props.disabled && '0 4px 12px rgba(37, 99, 235, 0.2)'};
  }

  &:active {
    transform: ${props => !props.disabled && 'scale(0.95)'};
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 12px;
  color: #374151;
  font-weight: 500;
  transition: background-color 0.2s;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background-color: ${props => !props.disabled && '#f3f4f6'};
  }
`;

const CloseButton = styled.button`
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  color: #6b7280;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background-color: ${props => !props.disabled && '#f3f4f6'};
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 50;
  animation: ${fadeIn} 0.2s ease-out;
  cursor: ${props => props.isLoading ? 'wait' : 'pointer'};
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};
`;

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message,  successMessage }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleConfirmClick = async () => {
    if (isProcessing) return; // Previene doble clic
    
    setIsProcessing(true);
    setLoading(true);
    setProgress(30);

    try {
      setProgress(60);
      await onConfirm();
      setProgress(100);
      setStatus('success');
      
      setTimeout(() => {
        onClose();
        // Resetear estados
        setIsProcessing(false);
        setLoading(false);
        setStatus(null);
        setProgress(0);
      }, 1500);
    } catch (error) {
      setProgress(100);
      setStatus('error');
      setTimeout(() => {
        setIsProcessing(false);
        setLoading(false);
        setStatus(null);
        setProgress(0);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={!isProcessing ? onClose : undefined} isLoading={isProcessing} />
      <ModalContainer>
        <Modal>
          <Header>
            <IconContainer>
              <IconCircle>
                <AlertCircle size={24} />
              </IconCircle>
              <Title>{title || '¿Confirmar acción?'}</Title>
            </IconContainer>
            <CloseButton 
              onClick={onClose} 
              disabled={isProcessing}
            >
              <X size={20} />
            </CloseButton>
          </Header>

          <Content>
            <p>{message || '¿Estás seguro de que deseas continuar con esta acción?'}</p>
          </Content>

          {!loading && (
            <Footer>
              <CancelButton 
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancelar
              </CancelButton>
              <ConfirmButton 
                onClick={handleConfirmClick}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar'}
              </ConfirmButton>
            </Footer>
          )}

          {loading && (
            <LoadingOverlay>
              {!status && <LoadingIcon size={40} />}
              {status === 'success' && (
                <StatusIcon success>
                  <Check size={40} />
                </StatusIcon>
              )}
              {status === 'error' && (
                <StatusIcon>
                  <XCircle size={40} />
                </StatusIcon>
              )}
              <StatusText success={status === 'success'}>
                {!status && 'Eliminando compra...'}
                {status === 'success' && (successMessage || '¡Acción completada correctamente!')}
                {status === 'error' && 'Error al eliminar la compra'}
              </StatusText>
            </LoadingOverlay>
          )}
          <ProgressBar 
            progress={progress}
            success={status === 'success'}
          />
        </Modal>
      </ModalContainer>
    </>
  );
};

export default ConfirmModal;