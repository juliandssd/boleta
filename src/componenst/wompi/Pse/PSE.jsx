import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { bancodisponible, createtransaction } from '../../../api/TaskPse';
import { detallesumpse } from '../../../api/Taskdetalle';
import { useidusuariodetallepago } from '../../../useUserStore';
import { usuariomostrarporid } from '../../../api/Taskusuario';
import { useNavigate } from 'react-router-dom';

// Estilos Globales
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
  }
`;

// Animaciones
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Contenedor Principal
const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem auto;
  }
`;

// Tarjeta Principal
const GlassCard = styled.div`
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.1);
  transition: all 0.4s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    box-shadow: 0 15px 40px rgba(255, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`;

// Título
const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(90deg, #ff4444, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientAnimation} 3s ease infinite;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

// Contador
const CountdownDisplay = styled.div`
  text-align: center;
  font-size: 2rem;
  color: ${props => props.timeLeft <= 10 ? '#ff4444' : '#ffffff'};
  margin: 1rem 0;
  font-weight: bold;
  animation: ${props => props.timeLeft <= 10 ? pulseAnimation : 'none'} 1s infinite;
`;

// Formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

// Labels
const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

// Inputs
const Input = styled.input`
  padding: 1.25rem;
  border: 2px solid rgba(255, 0, 0, 0.2);
  border-radius: 15px;
  font-size: 1.1rem;
  background: rgba(40, 40, 40, 0.9);
  color: #ffffff;
  transition: all 0.3s ease;
  height: 10px;

  &:focus {
    border-color: #ff4444;
    box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.1);
    transform: translateY(-2px);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &.error {
    border-color: #ff0000;
    animation: ${pulseAnimation} 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    font-size: 1.2rem;
    height: 10px;
  }
`;

// Select
const Select = styled.select`
  padding: 1.25rem;
  border: 2px solid rgba(255, 0, 0, 0.2);
  border-radius: 15px;
  font-size: 1.1rem;
  background: rgba(40, 40, 40, 0.9);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 60px;

  &:focus {
    border-color: #ff4444;
    box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.1);
    transform: translateY(-2px);
    outline: none;
  }

  option {
    background: #2d2d2d;
    color: #ffffff;
    padding: 1rem;
  }

  &.error {
    border-color: #ff0000;
    animation: ${pulseAnimation} 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    font-size: 1.2rem;
    height: 65px;
  }
`;

// Botón
const GradientButton = styled.button`
  padding: 1.2rem 2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(45deg, #ff0000, #ff4444);
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
  opacity: ${props => props.disabled ? '0.7' : '1'};

  &:before {
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

  &:hover:not(:disabled):before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 0, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #4a4a4a;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    font-size: 1.2rem;
    width: 100%;
    height: 65px;
  }
`;

// Display de Monto
const AmountDisplay = styled.div`
  padding: 1.25rem;
  border: 2px solid rgba(255, 0, 0, 0.2);
  border-radius: 15px;
  font-size: 1.5rem;
  background: rgba(40, 40, 40, 0.9);
  color: #ffffff;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  animation: ${glowAnimation} 2s infinite;
  height: 10px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1.75rem;
    height:10px;
  }
`;

const AmountValue = styled.span`
  color: #ff4444;
  font-weight: 700;
  font-size: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
`;

const AmountLabel = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Mensajes de Error y Validación
const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
  animation: ${pulseAnimation} 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.25rem;
  }
`;

const ValidationMessage = styled.span`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
// Loader
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 0, 0, 0.1);
  border-top-color: #ff4444;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

// Texto de Ayuda
const HelpText = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PSE = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const { idusuariodetallepago } = useidusuariodetallepago();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  const [formData, setFormData] = useState({
    payerDocumentType: '',
    payerDocumentNumber: '',
    phoneNumber: '',
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
      .replace('COP', '$')
      .trim();
  };

  // Efecto para el contador
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFormBlocked(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formatear tiempo para mostrar
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.payerDocumentType) {
      errors.documentType = 'Seleccione un tipo de documento';
    }

    if (!formData.payerDocumentNumber) {
      errors.documentNumber = 'Ingrese su número de documento';
    } else if (!/^\d{6,12}$/.test(formData.payerDocumentNumber)) {
      errors.documentNumber = 'Número de documento inválido (6-12 dígitos)';
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Ingrese su número de celular';
    } else if (!/^3\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Número de celular inválido (10 dígitos iniciando con 3)';
    }

    if (!selectedBank) {
      errors.bank = 'Seleccione un banco';
    }

    return errors;
  };

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bancodisponible();
      if (!response.data || !response.data.data) {
        throw new Error('Datos de instituciones no disponibles');
      }
      
      setInstitutions(response.data.data);
    } catch (error) {
      console.error('Error al obtener las instituciones financieras:', error);
      setError('Error al cargar las instituciones financieras. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTotal = async () => {
    try {
      const response = await detallesumpse({ id: idusuariodetallepago });
      setTotal(response.data.message);
    } catch (error) {
      console.error('Error al obtener el total:', error);
      setError('Error al cargar el monto del pago');
    }
  };

  useEffect(() => {
    fetchInstitutions();
    fetchTotal();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  useEffect(() => {
    if (!idusuariodetallepago) {
      navigate('/');
    }
  }, []);

  const fetdata = async () => {
    try {
      const response = await usuariomostrarporid({id: idusuariodetallepago});
      return response.data.data;
    } catch (error) {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isFormBlocked) {
      setError('El tiempo ha expirado. Por favor, recargue la página para intentar nuevamente.');
      return;
    }

    setIsSubmitting(true);
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const resusuario = await fetdata();
    const nombre = `${resusuario.nombre} ${resusuario.apellido}`;

    try {
      const transactionData = {
        _correo: resusuario.correo,
        _nombre: nombre,
        _user_legal_id_type: formData.payerDocumentType,
        _user_legal_id: formData.payerDocumentNumber,
        _financial_institution_code: selectedBank,
        _phone_number: formData.phoneNumber,
        _id_usuario: idusuariodetallepago
      };
      const res = await createtransaction(transactionData);
      console.log(res);
      if (!res.data.success) {
        throw new Error(res.data.error || 'Error al procesar el pago');
      }
      window.location.href = res.data.redirectUrl;
    } catch (error) {
      console.error(error);
      setError('Error al procesar el pago. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <GlassCard>
          <Title>Pago con PSE</Title>
          
          <CountdownDisplay timeLeft={timeLeft}>
            Tiempo restante: {formatTime(timeLeft)}
          </CountdownDisplay>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Monto a pagar</Label>
              <AmountDisplay>
                <AmountValue>{formatCurrency(total)}</AmountValue>
                <AmountLabel>COP</AmountLabel>
              </AmountDisplay>
            </FormGroup>

            <FormGroup>
              <Label>Tipo de identificación</Label>
              <Select
                value={formData.payerDocumentType}
                name="payerDocumentType"
                onChange={handleInputChange}
                required
                className={validationErrors.documentType ? 'error' : ''}
                disabled={isFormBlocked}
              >
                <option value="">Seleccione una identificación</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="NIT">NIT</option>
              </Select>
              {validationErrors.documentType && (
                <ValidationMessage>{validationErrors.documentType}</ValidationMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Identificación</Label>
              <Input
                type="text"
                name="payerDocumentNumber"
                value={formData.payerDocumentNumber}
                onChange={handleInputChange}
                required
                placeholder="Número de identificación"
                className={validationErrors.documentNumber ? 'error' : ''}
                maxLength={12}
                disabled={isFormBlocked}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {validationErrors.documentNumber && (
                <ValidationMessage>{validationErrors.documentNumber}</ValidationMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Número de Celular</Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="Número de celular (ej: 3101234567)"
                className={validationErrors.phoneNumber ? 'error' : ''}
                maxLength={10}
                disabled={isFormBlocked}
                pattern="3[0-9]{9}"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                  if (formData.phoneNumber.length >= 10 && e.key !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
              />
              {validationErrors.phoneNumber && (
                <ValidationMessage>{validationErrors.phoneNumber}</ValidationMessage>
              )}
              <HelpText>
                El número debe comenzar con 3 y tener 10 dígitos
              </HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Banco</Label>
              <Select
                value={selectedBank}
                onChange={(e) => {
                  setSelectedBank(e.target.value);
                  if (validationErrors.bank) {
                    setValidationErrors(prev => ({...prev, bank: null}));
                  }
                }}
                required
                className={validationErrors.bank ? 'error' : ''}
                disabled={isFormBlocked}
              >
                <option value="">Seleccione su banco</option>
                {institutions.map(bank => (
                  <option 
                    key={bank.financial_institution_code} 
                    value={bank.financial_institution_code}
                  >
                    {bank.financial_institution_name}
                  </option>
                ))}
              </Select>
              {validationErrors.bank && (
                <ValidationMessage>{validationErrors.bank}</ValidationMessage>
              )}
            </FormGroup>

            <GradientButton 
              type="submit" 
              disabled={isSubmitting || isFormBlocked}
            >
              {isSubmitting ? (
                <>
                  <Loader 
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      marginRight: '10px',
                      display: 'inline-block',
                      verticalAlign: 'middle'
                    }} 
                  />
                  Procesando...
                </>
              ) : isFormBlocked ? (
                'Tiempo expirado'
              ) : (
                'Pagar con PSE'
              )}
            </GradientButton>
          </Form>
        </GlassCard>
      </Container>
    </>
  );
};

export default PSE;