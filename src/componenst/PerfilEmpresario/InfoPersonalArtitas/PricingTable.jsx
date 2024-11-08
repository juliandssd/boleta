import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useConciertoStore } from '../../../useUserStore';
import { palcomostrarcliente } from '../../../api/Taskpalco';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 97%;
  max-width: 97%;
  padding: 1rem;
  background: linear-gradient(135deg, #1a0000 0%, #3d0000 100%);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0;
  font-weight: 800;
  background: linear-gradient(to right, #ff3333, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 1.5rem;
  color: #fff;
  border: 1px solid rgba(255, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: ${props => props.estado === 'LIBRE' ? 'pointer' : 'not-allowed'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${props => props.estado === 'LIBRE' ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.estado === 'LIBRE' ? '0 12px 40px rgba(255, 0, 0, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.2)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.estado === 'OCUPADO' 
      ? 'linear-gradient(45deg, rgba(255, 0, 0, 0.1), rgba(0, 0, 0, 0.05))'
      : 'linear-gradient(45deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.05))'};
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    margin: 0 0.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Price = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ff3333;
  margin: 1rem 0;
  text-align: right;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => props.estado === 'OCUPADO' 
    ? 'rgba(255, 0, 0, 0.15)' 
    : 'rgba(0, 255, 0, 0.15)'};
  color: ${props => props.estado === 'OCUPADO' ? '#ff4444' : '#44ff44'};
  border: 1px solid ${props => props.estado === 'OCUPADO' ? '#ff4444' : '#44ff44'};
  transition: all 0.3s ease;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.estado === 'OCUPADO' ? '#ff4444' : '#44ff44'};
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  color: #ff3333;
  font-size: 1.25rem;
`;

const ErrorContainer = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff3333;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  color: #ff3333;
  max-width: 600px;
  margin: 2rem auto;
`;

const PricingCards = ({id}) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await palcomostrarcliente(id);
        if (!response.data || response.data.length === 0) {
          setError('No se encontraron localidades disponibles');
          return;
        }
        
        setDatos(response.data);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleCardClick = (item) => {
    if (item.estado === 'LIBRE') {
      console.log('Palco seleccionado:', item);
      // Aquí puedes agregar tu lógica de selección
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Cargando localidades...</LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>{error}</ErrorContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>Selecciona tu Localidad</Title>
      <Grid>
        {datos.map((item, index) => (
          <Card
            key={index}
            estado={item.estado}
            onClick={() => handleCardClick(item)}
          >
            <CardTitle>
              {item.nombre}
              <StatusBadge estado={item.estado}>
                {item.estado}
              </StatusBadge>
            </CardTitle>
            
            <Price>
              ${new Intl.NumberFormat('es-CO').format(item.precio)}
            </Price>

            <DetailRow>
              <DetailLabel>Categoría</DetailLabel>
              <DetailValue>{item.categoria}</DetailValue>
            </DetailRow>

            {item.estado !== 'OCUPADO' && (
    <DetailRow>
      <DetailLabel>
        {parseInt(item.disponibilidad) > 0 ? 'Disponibilidad individual' : 'Disponibilidad'}
        </DetailLabel>
      <DetailValue>
      {parseInt(item.disponibilidad) > 0 ? item.disponibilidad : item.personas}
        </DetailValue>
    </DetailRow>
  )}
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default PricingCards;