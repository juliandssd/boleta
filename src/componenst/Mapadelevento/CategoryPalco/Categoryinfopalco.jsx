import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palcomostrarPorCategoriayidevento } from '../../../api/Taskpalco';
import { useConciertoStore, useDataStorePalco, useVisibilityStore } from '../../../useUserStore';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Styled components
const Container = styled.div`
  background-color: #121212;
  color: #f5f5f5;
  padding: 24px;
  border-radius: 16px;
  width: 360px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #f5f5f5;
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 12px;
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: #1a1a1a;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #f5f5f5;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #aaa;
  font-size: 0.95rem;
`;

const ColorDot = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#dcdde1'};
  margin-right: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1), -1px -1px 3px rgba(255, 255, 255, 0.5);
`;

const Price = styled.div`
  font-weight: 700;
  color: #2ecc71;
  font-size: 1.2rem;
`;

const StyledCheckbox = styled.div`
  width: 24px;
  height: 24px;
  background-color: #333;
  border-radius: 6px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: inset 2px 2px 4px #1a1a1a, inset -2px -2px 4px #4d4d4d;
  transition: background-color 0.3s, box-shadow 0.3s;

  ${(props) =>
    props.checked &&
    `
    background-color: #1abc9c;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.6);
  `}

  ${(props) =>
    props.checked &&
    `
    &::before {
      content: '';
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
  `}
`;

// Component
const PriceList = () => {
  const [locations, setLocations] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const { dataList, setInitialData } = useDataStorePalco();
  const { conciertoId } = useConciertoStore();
  const { hiddenCategories, toggleCategoryVisibility } = useVisibilityStore();

  useEffect(() => {
    palcoMostrarporcategory();
  }, [setInitialData]);

  const palcoMostrarporcategory = async () => {
    try {
      const response = await palcomostrarPorCategoriayidevento(conciertoId);
      setLocations(response.data);

      // Inicializar `checkedItems` basado en `hiddenCategories`
      const initialCheckedItems = response.data.reduce((acc, _, index) => {
        acc[index] = true; // Inicializa todos los checkboxes como `true`
        return acc;
      }, {});
      setCheckedItems(initialCheckedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
    toggleCategoryVisibility(locations[index].categoria); // Alternar la visibilidad de la categoría
  };

  return (
    <Container>
      <Title>Ubicaciones agregadas a la cesta</Title>
      {locations.map((location, index) => (
        <PriceRange key={index}>
          <Label>
            <StyledCheckbox
              checked={checkedItems[index] || false}
              onClick={() => handleCheck(index)}
            >
              {checkedItems[index] ? <FaCheckCircle color="#fff" /> : <FaTimesCircle color="#aaa" />}
            </StyledCheckbox>
            <ColorDot color={location.Color} />
            {location.categoria}
          </Label>
          <Price>${location.precio.toLocaleString()}</Price>
        </PriceRange>
      ))}
    </Container>
  );
};

export default PriceList;