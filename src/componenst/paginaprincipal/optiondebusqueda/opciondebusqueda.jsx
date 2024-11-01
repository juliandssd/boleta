import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Search, MapPin, Calendar, Tag } from 'lucide-react';

const shine = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  min-height: 140px;
  padding: 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      #0a0a0a 70%
    ),
    repeating-linear-gradient(
      transparent 0%,
      transparent 40%,
      rgba(255, 0, 0, 0.03) 40.5%,
      rgba(255, 0, 0, 0.03) 41%,
      transparent 41.5%,
      transparent 100%
    );
    animation: ${shine} 60s linear infinite;
    transform: rotate(-45deg);
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 0 40px rgba(255, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 0, 0, 0.1);
  animation: ${floatingAnimation} 6s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent 20%,
      rgba(255, 0, 0, 0.3) 40%,
      rgba(255, 0, 0, 0.5) 60%,
      transparent 80%
    );
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  position: relative;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: ${props => props.$flex || 1};
  min-width: ${props => props.$minWidth || 'auto'};

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), 0 0 10px rgba(255, 0, 0, 0.1), inset 0 0 2px rgba(255, 0, 0, 0.1); }
  50% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.2), inset 0 0 4px rgba(255, 0, 0, 0.2); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), 0 0 10px rgba(255, 0, 0, 0.1), inset 0 0 2px rgba(255, 0, 0, 0.1); }
`;

const InputWrapper = styled.div`
  position: relative;
  background: ${props => props.$isFocused ? 
    'rgba(40, 40, 40, 0.9)' : 
    'rgba(30, 30, 30, 0.6)'};
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${props => props.$isFocused ? 
    'rgba(255, 0, 0, 0.3)' : 
    'rgba(255, 255, 255, 0.1)'};

  ${props => props.$isFocused && `
    transform: translateY(-2px);
    animation: ${glowAnimation} 2s ease-in-out infinite;
  `}

  &:hover {
    background: rgba(40, 40, 40, 0.8);
    border-color: rgba(255, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  position: absolute;
  top: -10px;
  left: 16px;
  background: linear-gradient(90deg, #ff0000, #ff4444);

  -webkit-text-fill-color: transparent;
  padding: 0 8px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    background: #0a0a0a;
    z-index: -1;
    transform: translateY(-50%);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.$isFocused ? '#ff0000' : '#666'};
  transition: all 0.3s ease;
  z-index: 1;
`;

const BaseInput = styled.input`
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  padding: 1.25rem 1.25rem 1.25rem 3.5rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #666;
    transition: all 0.3s ease;
  }

  &:focus::placeholder {
    color: #888;
    transform: translateX(5px);
  }
`;

const Select = styled(BaseInput).attrs({ as: 'select' })`
  cursor: pointer;
  appearance: none;
  
  option {
    background: #1a1a1a;
    color: white;
    padding: 1rem;
  }
`;

const buttonShine = keyframes`
  0% {
    mask-position: 150%;
  }
  100% {
    mask-position: -50%;
  }
`;

const SearchButton = styled.button`
  min-width: 160px;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: white;
  font-weight: 600;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  font-size: 1rem;
  letter-spacing: 1px;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s ease;
    mask: linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-position: 150%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 0 20px rgba(255, 0, 0, 0.3),
      0 0 40px rgba(255, 0, 0, 0.1);

    &::after {
      animation: ${buttonShine} 1.5s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SearchBar = () => {
  const [focused, setFocused] = useState(null);

  return (
    <SearchContainer>
      <SearchWrapper>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup $flex={1.5} $minWidth="250px">
            <InputWrapper $isFocused={focused === 'search'}>
              <Label>Búsqueda</Label>
              <IconWrapper $isFocused={focused === 'search'}>
                <Search size={22} />
              </IconWrapper>
              <BaseInput
                type="text"
                placeholder="¿Qué estás buscando?"
              
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <InputWrapper $isFocused={focused === 'city'}>
              <Label>Ciudad</Label>
              <IconWrapper $isFocused={focused === 'city'}>
                <MapPin size={22} />
              </IconWrapper>
              <Select
              >
                <option value="">Selecciona ciudad</option>
                <option>Madrid</option>
                <option>Barcelona</option>
                <option>Valencia</option>
              </Select>
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <InputWrapper $isFocused={focused === 'date'}>
              <Label>Fecha</Label>
              <IconWrapper $isFocused={focused === 'date'}>
                <Calendar size={22} />
              </IconWrapper>
              <BaseInput
                type="text"
                placeholder="¿Cuándo?"
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <InputWrapper $isFocused={focused === 'category'}>
              <Label>Categoría</Label>
              <IconWrapper $isFocused={focused === 'category'}>
                <Tag size={22} />
              </IconWrapper>
              <Select
              >
                <option value="">Tipo de evento</option>
                <option>Conciertos</option>
                <option>Deportes</option>
                <option>Teatro</option>
              </Select>
            </InputWrapper>
          </InputGroup>

          <SearchButton>
            <Search size={22} />
            <span>Buscar</span>
          </SearchButton>
        </Form>
      </SearchWrapper>
    </SearchContainer>
  );
};

export default SearchBar;