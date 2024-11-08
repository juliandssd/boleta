
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bancodisponible, createtransaction } from '../../../api/TaskPse';

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: white;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  padding: 2rem;
`;

const PSE = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    payerDocumentType: '',
    payerDocumentNumber: '',
    amount: '',
  });

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await bancodisponible();
        setInstitutions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las instituciones financieras:', error);
        setError('Error al cargar las instituciones financieras');
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBank) {
      alert('Por favor seleccione un banco');
      return;
    }

    try {
      const transactionData = {
          _user_legal_id_type: formData.payerDocumentType,
          _user_legal_id: formData.payerDocumentNumber,
          _financial_institution_code: selectedBank,
          _amount_in_cents: parseInt(formData.amount) * 100,
      };

      // Aquí iría tu llamada a la API para crear la transacción
      console.log('Datos de la transacción:', transactionData);
     try {
        const res= await createtransaction(transactionData);
        if (!res.data.success) {
          throw new Error(data.error || 'Error al procesar el pago');
      }
      window.location.href = res.data.redirectUrl;
     } catch (error) {
        console.log(error);
     }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError('Error al procesar el pago. Por favor intente nuevamente.');
    }
  };

  if (loading) return <LoadingMessage>Cargando instituciones financieras...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Container>
      <Title>Pago con PSE</Title>
      
      <Form onSubmit={handleSubmit}>

        <FormGroup>
          <Label>Monto a pagar</Label>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Banco</Label>
          <Select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
          >
            <option value="">A continuación seleccione su banco</option>
            {institutions.map(bank => (
              <option 
                key={bank.financial_institution_code} 
                value={bank.financial_institution_code}
              >
                {bank.financial_institution_name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit">
          Pagar con PSE
        </Button>
      </Form>
    </Container>
  );
};

export default PSE;