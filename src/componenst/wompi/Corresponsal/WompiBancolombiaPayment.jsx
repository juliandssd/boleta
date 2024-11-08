import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createTransacionBancolombia } from '../../../api/TaskBancolombia';

export const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4C6EF5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #364FC7;
  }

  &:disabled {
    background-color: #A5B4FC;
    cursor: not-allowed;
  }
`;

export const PaymentInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #F8F9FA;
  border-radius: 4px;
`;

export const InfoTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 500;
`;

export const InfoText = styled.p`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #666;
`;

export const Instructions = styled.p`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  font-size: 0.875rem;
  color: #666;
`;

// PaymentForm.jsx


const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const info ={
        amount: 50000,
        customer_email: 'cliente@ejemplo.com',
        full_name: 'Juan Pérez',
        phone_number: '+573121234567',
        legal_id: '123456789',
        legal_id_type: 'CC',
        redirect_url: 'https://tutienda.com/confirmacion' // opcional
      }
      const response = await createTransacionBancolombia(info);
      setPaymentInfo(response.data);
    } catch (error) {
      console.error('Error al crear el pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Pago en Corresponsal Bancolombia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment}>
            <FormGroup>
              <Label>Monto</Label>
              <Input
                type="text"
                value="$50.000"
                disabled
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Procesando...' : 'Generar pago'}
            </Button>

            {paymentInfo && (
              <PaymentInfo>
                <InfoTitle>Información de pago:</InfoTitle>
                <InfoText>ID: {paymentInfo.id}</InfoText>
                <InfoText>Referencia: {paymentInfo.reference}</InfoText>
                <InfoText>Estado: {paymentInfo.status}</InfoText>
                <Instructions>
                  Diríjase a un Corresponsal Bancolombia y proporcione esta referencia para realizar el pago.
                </Instructions>
              </PaymentInfo>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentForm;
