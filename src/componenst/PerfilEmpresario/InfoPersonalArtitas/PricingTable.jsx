import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useConciertoStore } from '../../../useUserStore';
import { palcoCategoryMostrarPorid_evento, palcomostrarcliente } from '../../../api/Taskpalco';

// Animaciones
const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const morph = keyframes`
  0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(69, 202, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 27, 107, 0.5); }
  100% { box-shadow: 0 0 10px rgba(69, 202, 255, 0.5); }
`;

// Componentes Styled
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(45deg, #000000, #1a0f1f);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 0, 85, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.08) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 0, 85, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(40px);
    animation: ${morph} 8s infinite;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  background: linear-gradient(45deg, #fff, #ff1b6b, #45caff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 5s linear infinite;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 200px;
    height: 6px;
    margin: 1.5rem auto;
    background: linear-gradient(90deg, #ff1b6b, #45caff);
    border-radius: 3px;
    transform: perspective(500px) rotateX(45deg);
    box-shadow: 0 5px 15px rgba(255, 27, 107, 0.5);
  }
`;

const LoadingScreen = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 35, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  color: #ff1b6b;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${fadeIn} 0.5s ease-out, ${pulseGlow} 2s infinite;
  padding: 3rem;
  border: 2px solid rgba(255, 27, 107, 0.2);

  &::after {
    content: '...';
    animation: ${shine} 2s linear infinite;
  }
`;

const ErrorScreen = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 3rem;
  text-align: center;
  background: rgba(255, 27, 107, 0.1);
  border: 2px solid rgba(255, 27, 107, 0.2);
  border-radius: 30px;
  color: #ff1b6b;
  backdrop-filter: blur(20px);
  animation: ${fadeIn} 0.5s ease-out;
  font-weight: 700;
  letter-spacing: 2px;
  box-shadow: 0 0 30px rgba(255, 27, 107, 0.1);

  &::before {
    content: '⚠️';
    display: block;
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: ${float} 3s ease-in-out infinite;
  }
`;

// ... Continuará en la Parte 2 ...
// ... Continuación de la Parte 1

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 3rem;
  padding: 1rem;
  perspective: 2000px;

  @media (min-width: 768px) {
    gap: 3rem;
  }
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Card = styled.div`
  position: relative;
  background: rgba(20, 20, 35, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 1rem;
  height: auto; // Cambiado de height: 400px
  min-height: 300px; // Añadido para asegurar una altura mínima
  width: 300px;
  display: flex; // Añadido
  flex-direction: column; // Añadido
  justify-content: space-between; // Añadido
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  overflow: hidden;
  transform-style: preserve-3d;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 30px;
    padding: 2px;
    background: linear-gradient(
      45deg, 
      ${props => props.isAvailable ? '#ff1b6b, #45caff' : '#666, #999'}
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }

  &:hover {
    transform: translateY(-20px) rotateX(10deg);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.3),
      0 0 30px ${props => props.isAvailable ? 'rgba(255, 27, 107, 0.3)' : 'transparent'};

    &::before {
      opacity: 1;
    }
  }
`;

const CategoryName = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff1b6b, transparent);
  }
`;


const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff1b6b, #45caff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  position: relative;
  
  &::before {
    content: '$';
    font-size: 2rem;
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to top, rgba(69, 202, 255, 0.1), transparent);
    filter: blur(10px);
  }
`;

const InfoSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
  @media (max-width: 768px) {
    order: 3; // Esto mueve la sección al final en móviles
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(10px);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03));
  }
`;

const InfoLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  background: linear-gradient(135deg, #45caff, #ff1b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isSingle ? '1fr' : 'repeat(auto-fit, minmax(35px, 1fr))'};
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 27, 107, 0.05), rgba(69, 202, 255, 0.05));
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  padding: ${props => props.isSingle ? '1rem' : '0.75rem'};
  text-align: ${props => props.isSingle ? 'center' : 'left'};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.03), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const ClientBadge = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: #fff;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.4s ease;
  background: ${props => props.estado === 'LIBRE' ?
    'linear-gradient(135deg, #45caff, #00ff88)' :
    'linear-gradient(135deg, #ff1b6b, #ff0844)'};
  
  &:hover {
    transform: scale(1.2) translateZ(20px);
    box-shadow: 
      0 10px 20px rgba(0, 0, 0, 0.2),
      0 0 15px ${props => props.estado === 'LIBRE' ? 
        'rgba(69, 202, 255, 0.5)' : 
        'rgba(255, 27, 107, 0.5)'};
  }

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: inherit;
    opacity: 0.5;
    filter: blur(4px);
    z-index: -1;
  }
`;
const PricingCards = ({ id }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setidEvento, setinfopalco } = useConciertoStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await palcoCategoryMostrarPorid_evento(id);
        
        if (!response.data?.length) {
          setError('No se encontraron localidades disponibles');
          return;
        }

        const datosCompletos = await Promise.all(
          response.data.map(async (item) => {
            try {
              const clienteResponse = await palcomostrarcliente(id, item.precio, item.categoria);
              return { ...item, clienteData: clienteResponse.data };
            } catch (err) {
              console.error('Error al obtener datos del cliente:', err);
              return { ...item, clienteData: [] };
            }
          })
        );

        setDatos(datosCompletos);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <LoadingScreen>Cargando localidades</LoadingScreen>;
  if (error) return <ErrorScreen>{error}</ErrorScreen>;

  return (
    <Container>
      <Inner>
        <Header>
          <Title>Selecciona tu Localidad</Title>
        </Header>
        <Grid>
          {datos.map((item, index) => {
            const availableClients = item.clienteData.filter(cliente => 
              cliente.estado === 'LIBRE').length;
            const isAvailable = item.estado === 'LIBRE';
            
            return (
              <Card 
                key={index}
                index={index}
                isAvailable={isAvailable}
                isClickable={isAvailable}
              >
                <CategoryName>
                  {item.categoria}

                </CategoryName>

                <Price>
                  {new Intl.NumberFormat('es-CO').format(item.precio)}
                </Price>

                <CardFooter>
  <InfoSection>
    <InfoRow>
      <InfoLabel>Capacidad Total</InfoLabel>
      <InfoValue>{item.Xpersonas} personas</InfoValue>
    </InfoRow>
    {item.clienteData?.length > 0 && (
      <InfoRow>
        <InfoLabel>Estado</InfoLabel>
        <InfoValue>
          {item.clienteData.length === 1 
            ? item.clienteData[0].disponibilidad === 0 || 
              item.clienteData[0].estado !== 'LIBRE'
              ? 'Ocupado'
              : `${item.clienteData[0].disponibilidad} disponibles`
            : `${availableClients} Palcos libres`}
        </InfoValue>
      </InfoRow>
    )}
  </InfoSection>
</CardFooter>
                {item.clienteData?.length > 0 && (
  <>
    {console.log('Toda la data de clienteData:', item.clienteData.length)}
    <ClientsGrid isSingle={item.clienteData.length === 1}>
      {item.clienteData.length === 1 ? (
        <span className="text-white font-bold text-lg">
          {item.clienteData[0].estado}
        </span>
      ) : (
        item.clienteData.map((cliente, clientIndex) => (
          <ClientBadge 
            key={clientIndex}
            estado={cliente.estado}
            index={clientIndex}
          >
            {cliente.numero}
          </ClientBadge>
        ))
      )}
    </ClientsGrid>
  </>
)}
              </Card>
            );
          })}
        </Grid>
      </Inner>
    </Container>
  );
};

export default PricingCards;