import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { User, Mail, Lock, IdCard, Loader2,Phone } from 'lucide-react';
import { enviocorreo } from '../../api/Taskenviocorreo';
import { useNavigate } from 'react-router-dom';
import { useidcreate } from '../../useUserStore';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setidcreate = useidcreate((state) => state.setidcreate);
  const [formData, setFormData] = useState({
    email: '',
    Number:'',
    password: '',
    name: '',
    lastName: '',
    documentId: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    if (!formData.Number || formData.Number.length !== 10 || formData.Number[0] !== '3') {
      alert('Ingresa un número de celular válido (10 dígitos comenzando con 3)');
      return;
    }
    if (!formData.documentId || formData.documentId.length < 5) {
      alert('El número de documento debe tener al menos 5 dígitos');
      return;
    }
  

    setIsLoading(true);
    try {
      const data = {
        p_nombre: formData.name,
        p_apellido: formData.lastName,
        p_identificacion: formData.documentId,
        p_correo: formData.email,
        p_password: formData.password,
        p_number:formData.Number
      };
      const response = await enviocorreo(data);

      if (response.data.message === 'correctamente') {
    console.log(response.data);
        setidcreate(response.data.encryptedIdd);
        navigate('/verify/number');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <FormContainer>
        <Header>
          <Title>Crear cuenta</Title>
          <Subtitle>¡Únete a nuestra comunidad!</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>
              <User size={20} color="#ff4747" />
              <LabelText>Nombre</LabelText>
            </InputLabel>
            <Input
              type="text"
              name="name"
              placeholder="Ej: Juan"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              <User size={20} color="#ff4747" />
              <LabelText>Apellido</LabelText>
            </InputLabel>
            <Input
              type="text"
              name="lastName"
              placeholder="Ej: Pérez"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              <Mail size={20} color="#ff4747" />
              <LabelText>Correo electrónico</LabelText>
            </InputLabel>
            <Input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>
              <Lock size={20} color="#ff4747" />
              <LabelText>Contraseña</LabelText>
            </InputLabel>
            <Input
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>
              <Phone size={20} color="#ff4747" />
              <LabelText>Número de celular</LabelText>
            </InputLabel>
            <Input
              type="number"
              name="Number"
              placeholder="Ej: 3217819810"
              value={formData.Number}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>
              <IdCard size={20} color="#ff4747" />
              <LabelText>Número de identificación</LabelText>
            </InputLabel>
            <Input
              type="text"
              name="documentId"
              placeholder="Ej: 12345678"
              value={formData.documentId}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <TermsContainer>
            <CheckboxWrapper>
              <CustomCheckbox
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <CheckboxLabel htmlFor="terms">
                He leído y acepto los <TermsLink href="#">Términos y condiciones</TermsLink>
              </CheckboxLabel>
            </CheckboxWrapper>
          </TermsContainer>

          <SubmitButton 
            type="submit" 
            disabled={!formData.termsAccepted || isLoading}
          >
            {isLoading ? (
              <>
                <SpinningLoader />
                Procesando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </SubmitButton>
        </Form>
      </FormContainer>
    </PageWrapper>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningLoader = styled(Loader2)`
  animation: ${rotate} 1s linear infinite;
  width: 20px;
  height: 20px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #1a1b26;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 460px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #ff4747;
  margin: 0;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  color: #9ca3af;
  font-size: 16px;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  max-width: 460px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 20px;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 460px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InputLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 4px;
`;

const LabelText = styled.span`
  color: #9ca3af;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  text-align: left;
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
  
  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TermsContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 80px;

  @media (min-width: 769px) {
    margin-bottom: 16px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background: #ff4747;
    border-color: #ff4747;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    color: white;
    font-size: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CheckboxLabel = styled.label`
  color: #9ca3af;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
`;

const TermsLink = styled.a`
  color: #ff4747;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #e03e3e;
  }
`;

const SubmitButton = styled.button`
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: #ff4747;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }

  @media (min-width: 769px) {
    width: 100%;
    max-width: 460px;
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
  }

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    position: fixed;
    bottom: 24px;
    left: 16px;
    right: 16px;
    font-size: 16px;
    z-index: 1000;
  }
  
  &:not(:disabled):active {
    background: #e03e3e;
  }

  &:not(:disabled):hover {
    background: #e03e3e;
  }
`;

export default RegisterForm;